import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";

import { FileInput, Label, Button, TextInput } from "flowbite-react";
import { DeleteModalForAll } from "../DelteModalForAll/DelteModalForAll";
import { useNavigate } from "react-router-dom";

export default function MealDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [meal, setMeal] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    protein: "",
    fat: "",
    carbohydrates: "",
    calories: "",
    // image: null,
    sizes: [
      {
        size: "Small",
        price: "",
      },
      {
        size: "Medium",
        price: "",
      },
      {
        size: "Large",
        price: "",
      },
    ],
  });

  const fetchMeal = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        // el api 3ayza token restruntttttttttttt
        `https://foodies-backend-1.onrender.com/dashboard/restaurant/meal/${id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiZDY1YjQ4MjM5YTMxNzJmOTJlZWIiLCJlbWFpbCI6Inl1bmd5QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMTIzIiwiYWRkcmVzcyI6IkFsZXgiLCJ0eXBlIjoiUmVzdGF1cmFudCIsImlhdCI6MTcwODkwNjE0MCwiZXhwIjoxNzQwNDYzNzQwfQ.MDrHAba8r7RqvUpwHRnRBACfYRFUvcF2PS6If6gKoLuoH9kg1litZmNBADktSwxE_41xdUxCxIZOMNT8N627ckF2ESA9-4XvgnfRe5OkOkFh3_SUdOGywK0t_0lBJlcCRsRyeiv-Tw97-JbDqQe9Gg9dHFBMRHW_MUKQVOq_hD07j9xYZlN2OSUbu2g0Qm5P7zHtejtK7iWwjR_D-VpSVipj6uDETld_H6H_B6ZvtlEyNxzMrJG_pcZ1jLsFnzDL-YfsvbtyeJcVEZ3iZuCeB35nmHJZGzTZZe8h8tORVNMG5dhK0zt0jayZXYcX03UNz-NxdAXebUwudTQio-uZXw`,
          },
        }
      );

      setMeal(data.data);

      setIsLoading(false);
      if (data.data) {
        setFormData({
          name: data.data.name,
          description: data.data.description,
          price: data.data.price,
          protein: data.data.protein,
          fat: data.data.fat,
          carbohydrates: data.data.carbohydrates,
          calories: data.data.calories,
          sizes: data.data.sizes.map((size) => ({
            size: size.size,
            price: size.price,
          })),
          // image: data.data.image,
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // this handle formdata changes
  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      sizes: prevState.sizes.map((sizeObj) =>
        sizeObj.size === id ? { ...sizeObj, price: value } : sizeObj
      ),
    }));
  };

  // this handle file changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMeal({ ...meal, image: reader.result });
      setFormData((prevState) => ({ ...prevState, image: file }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    try {
      axios.delete(
        `https://foodies-backend-1.onrender.com/dashboard/restaurant/meal/${id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiZDY1YjQ4MjM5YTMxNzJmOTJlZWIiLCJlbWFpbCI6Inl1bmd5QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMTIzIiwiYWRkcmVzcyI6IkFsZXgiLCJ0eXBlIjoiUmVzdGF1cmFudCIsImlhdCI6MTcwODkwNjE0MCwiZXhwIjoxNzQwNDYzNzQwfQ.MDrHAba8r7RqvUpwHRnRBACfYRFUvcF2PS6If6gKoLuoH9kg1litZmNBADktSwxE_41xdUxCxIZOMNT8N627ckF2ESA9-4XvgnfRe5OkOkFh3_SUdOGywK0t_0lBJlcCRsRyeiv-Tw97-JbDqQe9Gg9dHFBMRHW_MUKQVOq_hD07j9xYZlN2OSUbu2g0Qm5P7zHtejtK7iWwjR_D-VpSVipj6uDETld_H6H_B6ZvtlEyNxzMrJG_pcZ1jLsFnzDL-YfsvbtyeJcVEZ3iZuCeB35nmHJZGzTZZe8h8tORVNMG5dhK0zt0jayZXYcX03UNz-NxdAXebUwudTQio-uZXw`,
          },
        }
      );
      navigate("/meals");
      console.log("deleted");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== null)
    );
    const updatedFormData = {
      ...filteredFormData,
      calories: String(filteredFormData.calories),
      protein: String(filteredFormData.protein),
      fat: String(filteredFormData.fat),
      carbohydrates: String(filteredFormData.carbohydrates),
    };
    console.log(updatedFormData);
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `https://foodies-backend-1.onrender.com/dashboard/restaurant/meal/${id}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiZDY1YjQ4MjM5YTMxNzJmOTJlZWIiLCJlbWFpbCI6Inl1bmd5QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMTIzIiwiYWRkcmVzcyI6IkFsZXgiLCJ0eXBlIjoiUmVzdGF1cmFudCIsImlhdCI6MTcwODkwNjE0MCwiZXhwIjoxNzQwNDYzNzQwfQ.MDrHAba8r7RqvUpwHRnRBACfYRFUvcF2PS6If6gKoLuoH9kg1litZmNBADktSwxE_41xdUxCxIZOMNT8N627ckF2ESA9-4XvgnfRe5OkOkFh3_SUdOGywK0t_0lBJlcCRsRyeiv-Tw97-JbDqQe9Gg9dHFBMRHW_MUKQVOq_hD07j9xYZlN2OSUbu2g0Qm5P7zHtejtK7iWwjR_D-VpSVipj6uDETld_H6H_B6ZvtlEyNxzMrJG_pcZ1jLsFnzDL-YfsvbtyeJcVEZ3iZuCeB35nmHJZGzTZZe8h8tORVNMG5dhK0zt0jayZXYcX03UNz-NxdAXebUwudTQio-uZXw`,
          },
        }
      );
      console.log(response);
      setMeal(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 ">
      <div className="bg-gray-800 shadow-lg p-5 rounded">
        <img src={meal.image} alt="Meal" className="w-full h-auto rounded" />
        <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput
            id="file"
            helperText="A profile picture is useful to confirm your are logged into your account"
            onChange={handleFileChange}
          />
        </div>
        <div className="mt-2">
          <h1 className="text-2xl mt-3 text-white">Meal rating</h1>
          <div className="flex mt-2">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className={`${
                    ratingValue <= Math.ceil(meal.rate)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-5 col-span-2 text-2xl bg-gray-800 rounded relative">
        <DeleteModalForAll handleDelete={handleDelete} />

        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Meal" value="Meal Name" />
            </div>
            <TextInput
              id="name"
              type="name"
              placeholder={meal.name}
              defaultValue={meal.name}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="description" />
            </div>
            <TextInput
              id="description"
              type="description"
              placeholder={meal.description}
              defaultValue={meal.description}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block w-1/2">
              <Label htmlFor="price" value="price" />
              <TextInput
                id="price"
                type="text"
                placeholder={meal.price}
                defaultValue={meal.price}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="protein" value="Protein" />
                <TextInput
                  id="protein"
                  type="text"
                  placeholder={meal.protein}
                  defaultValue={meal.protein}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="fats" value="Fats" />
                <TextInput
                  id="fat"
                  type="text"
                  placeholder={meal.fat}
                  defaultValue={meal.fat}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="carbohydrates" value="Carbohydrates" />
                <TextInput
                  id="carbohydrates"
                  type="text"
                  placeholder={meal.carbohydrates}
                  defaultValue={meal.carbohydrates}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="calories" value="Calories" />
                <TextInput
                  id="calories"
                  type="text"
                  placeholder={meal.calories}
                  defaultValue={meal.calories}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="sizes" value="Sizes" />
              <div className="grid grid-cols-3 gap-3 ">
                {formData.sizes.map((sizeObj, index) => (
                  <div key={index}>
                    <Label
                      htmlFor={sizeObj.size}
                      value={`Size: ${sizeObj.size}`}
                    />
                    <TextInput
                      id={sizeObj.size}
                      type="number"
                      placeholder={`Price for ${sizeObj.size}`}
                      defaultValue={sizeObj.price}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit" onClick={handleSubmit}>
            {isLoading ? <i className="fa fa-spin fa-spinner"></i> : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
}
