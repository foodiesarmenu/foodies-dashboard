import axios from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import {
  Card,
  Badge,
  Rating,
  Modal,
  Label,
  TextInput,
  Textarea,
  Button,
} from "flowbite-react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import "./Menu.css";
import { Component } from "../Breadcrumb/Breadcrumb";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMeals, setSelectedMeals] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: "",
  });

  const fetchMenu = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        // els7 en el id yb2a el id ely 3amel be login
        `https://foodies-backend-1.onrender.com/mobile/restaurant/menu/65ee39a0b3eac564b5db7a81`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(data.data);
      setMenu(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        `https://foodies-backend-1.onrender.com/dashboard/restaurant/meal/${selectedMeals[selectedIndex]._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  function onCloseModal() {
    setOpenModal(false);
  }

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
      <div className="flex justify-between m-2 items-center">
        <Component second="Restaurant" third="Menu" />
        <h1 className="text-white text-3xl">Categories</h1>
      </div>
      <div className="flex justify-center overflow-x-auto whitespace-nowrap gap-8">
        <div className="flex items-start gap-8">
          {menu.map((menuItem, index) => (
            <div
              onClick={() => setSelectedMeals(menuItem.meals)}
              key={index}
              className="bg-transparent p-4 rounded-lg shadow-md flex flex-col items-center justify-items-center m-4"
            >
              <img
                src={menuItem.meals[0].image}
                alt={menuItem.name + " image"}
                className="h-24 w-24 object-cover rounded-full bg-gray-200"
              />
              <h1 className="mt-4 text-white font-bold text-gray-900 dark:text-white">
                {menuItem.name}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-5 flex justify-between m-2">
        <h1 className="text-white text-3xl">Meals</h1>
      </div>
      {selectedMeals &&
        selectedMeals.map((meal, index) => (
          <div
            key={index}
            className="w-full m-1 p-1 border rounded shadow-sm flex bg-white relative"
          >
            <div className="absolute top-0 right-0 m-2 flex justify-end">
              <button
                onClick={() => {
                  setFormData(meal);
                  setOpenModal(true);
                  setSelectedIndex(index);
                }}
                className="bg-green-500 rounded p-1 mr-1"
              >
                <HiPencilAlt />
              </button>
              <button className="bg-red-500 rounded p-1">
                <HiTrash />
              </button>
            </div>
            <img
              src={meal.image}
              alt={meal.name}
              className="w-1/5 h-auto object-cover rounded-l"
            />
            <div className="flex flex-col justify-between w-4/5 p-2">
              <div>
                <h5 className="text-base font-bold text-gray-900 dark:text-white">
                  {meal.name}
                </h5>
                <div className="flex flex-wrap gap-1">
                  {meal.tags.map((tag, index) => (
                    <Badge key={index} color="info">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                  {meal.description}
                </p>
              </div>
              <div className="font-bold text-xs mt-auto text-gray-700">
                <p>Calories: {meal.calories}</p>
                <p>Protein: {meal.protein}</p>
                <p>Carbs: {meal.carbohydrates}</p>
                <p>Fats: {meal.fat}</p>
              </div>
              <div className="flex justify-between mt-auto">
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <Rating.Star key={i} filled={i < Math.floor(meal.rate)} />
                  ))}
                </Rating>
                <p className="font-bold text-sm">
                  {meal.price} {meal.currency}
                </p>
              </div>
            </div>
          </div>
        ))}

      <div>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="name" />
                </div>
                <TextInput
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="description" />
                </div>
                <Textarea
                  value={formData.description}
                  onChange={handleChange}
                  id="description"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="price" />
                </div>
                <TextInput
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between">
                <div className="w-1/4">
                  <div className="mb-2 block">
                    <Label htmlFor="calories" value="calories" />
                  </div>
                  <TextInput
                    id="calories"
                    value={formData.calories}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/4">
                  <div className="mb-2 block">
                    <Label htmlFor="protein" value="protein" />
                  </div>
                  <TextInput
                    id="protein"
                    value={formData.protein}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/4">
                  <div className="mb-2 block">
                    <Label htmlFor="carbs" value="carbs" />
                  </div>
                  <TextInput
                    id="carbohydrates"
                    value={formData.carbohydrates}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/4">
                  <div className="mb-2 block">
                    <Label htmlFor="fats" value="fats" />
                  </div>
                  <TextInput
                    id="fat"
                    value={formData.fat}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full">
                <Button onClick={handleUpdate}>Update</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
