import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Modal, Button } from "flowbite-react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import AddMeal from "../AddMeal/AddMeal";
import TokenContext from "../../Context/userContext";
import AddFirstMeal from "../AddFirstMeal/AddFirstMeal";

export default function Meals() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([])

  const { user } = useContext(TokenContext)
  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://foodies-backend-1.onrender.com/mobile/restaurant/menu/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const names = data.data.map(item => item.name);
      setTags(names)
      setMenu(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div>
      {menu.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg text-gray-200 mb-4">There are no meals available. Please add your first meal.</p>
          <AddFirstMeal className="bg-black" tags={tags} />
        </div>
        ) : (
          menu.map((category) => (
            <div key={category._id} className="group p-4 rounded-lg">
              <h1 className="text-2xl ml-2 text-white">{category.name}</h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-2">
                {category.meals.length === 0 ? (
                  <div className="flex justify-center items-center col-span-full">
                    <AddMeal tags={tags} />
                  </div>
                ) : (
                  category.meals.map((meal) => (
                    <div
                      key={meal._id}
                      className="max-w-xs m-2 h-auto w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-300"
                    >
                      <Link to={"/meal-details/" + meal._id}>
                        <img
                          className="h-48 w-full object object-center"
                          src={meal.image}
                          alt={meal.name}
                        />
                        <div className="p-4 h-max">
                          <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                              {meal.name}
                            </h5>
                          </a>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-md font-bold text-cyan-700 dark:text-white">
                              {meal.price} {meal.currency}
                            </span>
                            <a
                              href="#"
                              className="rounded-lg bg-transparent border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 hover:text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 hover:border-transparent transition-colors duration-500"
                            >
                              <div className="flex items-center">
                                View more{" "}
                                <FaArrowRight className="ml-2 text-cyan-700" />
                              </div>
                            </a>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
                <AddMeal tags={tags} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
