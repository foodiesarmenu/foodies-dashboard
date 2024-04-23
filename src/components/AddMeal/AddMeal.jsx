import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Label,
  FileInput,
  Select,
} from "flowbite-react";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";

export default function AddMeal({ tags }) {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    price: "",
    currency: "",
    image: null,
    tags: [],
    rate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setErrorMessage("");
    const { id, value } = event.target;
    if (id === "image") {
      setFormData({ ...formData, [id]: event.target.files[0] });
    } else if (id === "tags") {
      setFormData({
        ...formData,
        [id]: Array.from(
          event.target.selectedOptions,
          (option) => option.value
        ),
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: ["calories", "carbohydrates", "fat", "price", "protein"].includes(
          id
        )
          ? parseInt(value, 10)
          : value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const data = new FormData();
    console.log(data, "data");
    for (const key in formData) {
      if (key === "tags") {
        formData[key].forEach((tag, index) => {
          data.append(`${key}[${index}]`, tag); // Append each tag separately
        });
      } else if (key === "rate") {
        data.append(key, String(formData[key])); // Convert rate to string
      } else {
        data.append(key, formData[key]);
      }
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://foodies-backend-1.onrender.com/dashboard/restaurant/meal`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiZDY1YjQ4MjM5YTMxNzJmOTJlZWIiLCJlbWFpbCI6Inl1bmd5QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMTIzIiwiYWRkcmVzcyI6IkFsZXgiLCJ0eXBlIjoiUmVzdGF1cmFudCIsImlhdCI6MTcwODkwNjE0MCwiZXhwIjoxNzQwNDYzNzQwfQ.MDrHAba8r7RqvUpwHRnRBACfYRFUvcF2PS6If6gKoLuoH9kg1litZmNBADktSwxE_41xdUxCxIZOMNT8N627ckF2ESA9-4XvgnfRe5OkOkFh3_SUdOGywK0t_0lBJlcCRsRyeiv-Tw97-JbDqQe9Gg9dHFBMRHW_MUKQVOq_hD07j9xYZlN2OSUbu2g0Qm5P7zHtejtK7iWwjR_D-VpSVipj6uDETld_H6H_B6ZvtlEyNxzMrJG_pcZ1jLsFnzDL-YfsvbtyeJcVEZ3iZuCeB35nmHJZGzTZZe8h8tORVNMG5dhK0zt0jayZXYcX03UNz-NxdAXebUwudTQio-uZXw`,
          },
        }
      );
      console.log(response.data, "changed");
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="max-w-xs m-2 h-auto w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center"
      >
        <div className="p-4 text-center">
          <h5 className="text-2xl font-semibold tracking-tight text-gray-500 dark:text-white">
            <IoMdAddCircle className="text-4xl mx-auto" />
            Add Meal
          </h5>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header> Add Meal </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <TextInput
                id="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <TextInput
                id="description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  id="price"
                  placeholder="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                />
                <TextInput
                  id="currency"
                  placeholder="Currency"
                  required
                  value={formData.currency}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="protein" value="Protein" />
                  <TextInput
                    id="protein"
                    type="number"
                    placeholder="protein"
                    defaultValue="protein"
                    value={formData.protein}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="fats" value="Fats" />
                  <TextInput
                    id="fat"
                    type="number"
                    placeholder="fat"
                    defaultValue="fat"
                    value={formData.fat}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="carbohydrates" value="Carbohydrates" />
                  <TextInput
                    id="carbohydrates"
                    type="number"
                    placeholder="carbohydrates"
                    defaultValue="carbohydrates"
                    value={formData.carbohydrates}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="calories" value="Calories" />
                  <TextInput
                    id="calories"
                    type="number"
                    placeholder="calories"
                    defaultValue="calories"
                    value={formData.calories}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="rate" value="rate" />
                <TextInput
                  id="rate"
                  type="number"
                  placeholder="rate"
                  defaultValue="rate"
                  value={formData.rate}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2 block">
                <Label htmlFor="tags" value="Select your Tags" required />
              </div>
              <TextInput
                id="tags"
                placeholder="Tags"
                required
                value={formData.tags}
                onChange={handleChange}
              />
              <Select
                id="tags"
                multiple
                value={formData.tags}
                onChange={handleChange}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
              <div id="fileUpload" className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload file" />
                </div>
                <FileInput
                  onChange={handleChange}
                  id="image"
                  helperText="Please Select one photo"
                />
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <div className="w-full">
                <Button className="w-full" type="submit">
                  {isLoading ? (
                    <i className="fa fa-spin fa-spinner"></i>
                  ) : (
                    `Add Meal `
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
