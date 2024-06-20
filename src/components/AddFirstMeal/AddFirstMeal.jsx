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

export default function AddFirstMeal({ tags }) {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    currency: "",
    image: null,
    tags: [],
    rate: "",
    sizes: [
      { size: "Small", price: "" },
      { size: "Medium", price: "" },
      { size: "Large", price: "" },
    ],
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
    }
    else if (["Small", "Medium", "Large"].includes(id)) {
      setFormData((prev) => ({
        ...prev,
        sizes: prev.sizes.map((size) =>
          size.size === id ? { ...size, price: parseInt(value, 10) } : size
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: ["calories", "carbohydrates", "fat", "protein"].includes(
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
    for (let key in formData) {
      if (key === "sizes") {
        formData[key].forEach((size, index) => {
          for (let sizeKey in size) {
            data.append(`sizes[${index}][${sizeKey}]`, size[sizeKey]);
          }
        });
      } else if (key === "tags") {
        formData[key].forEach((tag, index) => {
          data.append(`tags[${index}]`, tag);
        });
      } else if (key === "image") {
        data.append(key, formData[key], formData[key].name);
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
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVlMzlhMGIzZWFjNTY0YjVkYjdhODEiLCJuYW1lIjoi2YPYsdmFINin2YTYtNin2YUiLCJlbWFpbCI6ImluZm9Aa2FybWVsc2hhbS5jb20iLCJwaG9uZU51bWJlciI6IisyMCAxMDAgMDAwIDEyMzQiLCJhZGRyZXNzIjoiMSwgRWwtTmFzciBSb2FkLCBIZWxpb3BvbGlzLCBDYWlybywgRWd5cHQiLCJpbWFnZSI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGx2bmRjMDhhL2ltYWdlL3VwbG9hZC92MTcxMDExMTEzNS9yZXN0YXVyYW50L2l3dDN0NndzNGlrbGZkZXZhb3BpLnBuZyIsInR5cGUiOiJSZXN0YXVyYW50IiwiaWF0IjoxNzEzOTI2MTQ3LCJleHAiOjE3NDU0ODM3NDd9.awiQIMrqgtRSldBjugp4J8MIHZox6v86gc8V02C9d17km-VgzaMiONTaESv5qTG_O3pRM5tO0Ff0y45mYPiSAPOhqoNpE-2uc2KiOKhlHvZbpwzktmIyHQQkO_IaRgLZCBK7fd8ZRBBxTdOGa-NsuL2xq0oB0dkPiV1KxyXwskwGAq2gVpP8Kx5XUmf5J5SmR9RKeE1EEatVOLf-83vmhVyc00nLsVRCFmCIULcegiV0mXihQzY4XpZFiljdtz4gSHvc465JVYeYm3alrkp5Sti9lmSRIq0pk_TM_xxkpE6RYgOJXRH-DQ0U8SGRMFKJvQdA1x0hFRJlNM-olc8pIA`,
          },
        }
      );
      console.log(response.data);
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
        className="w-full m-2 h-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer"
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
                <Label htmlFor="rate" value="Rate" />
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
                <div className="grid grid-cols-2 gap-4">
                  {formData.sizes.map((sizeObj, index) => (
                    <div key={index}>
                      <Label htmlFor={sizeObj.size} value={`Size: ${sizeObj.size}`} />
                      <TextInput
                        id={sizeObj.size}
                        placeholder={`Price for ${sizeObj.size}`}
                        required={sizeObj.size === "Small"} // At least small size is required
                        value={sizeObj.price}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="w-full">
                <Button className="w-full" type="submit">
                  {isLoading ? (
                    <i className="fa fa-spin fa-spinner"></i>
                  ) : (
                    `Add Meal`
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
