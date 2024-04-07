"use client";

import {
  Avatar,
  Button,
  Label,
  TextInput,
  Toast,
  Select,
} from "flowbite-react";
import { HiPencil, HiOutlineCheck, HiCheck } from "react-icons/hi";
import axios from "axios";
import Loader from "../Loader/Loader";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      const { data } = await axios.get(
        `https://foodies-backend-1.onrender.com/dashboard/admin/Abdo@gmail.com`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(data.data);
      setProfileData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
// need update Admin API
  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        `https://foodies-backend-1.onrender.com/dashboard/admin/restaurant`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(data, "changed");
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profileData) {
      setFormData({
        email: profileData.email,
        address: profileData.address,
        phoneNumber: profileData.phoneNumber,
        gender: profileData.gender,
        dateOfBirth: profileData.dateOfBirth,
      });
    }
  }, [profileData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {showSuccessToast && (
        <Toast className="fixed top-6 left-1/2 transform -translate-x-1/2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Updated successfully.</div>
          <Toast.Toggle onClick={() => setShowSuccessToast(false)} />
        </Toast>
      )}

      {showErrorToast && (
        <Toast className="fixed top-6 left-1/2 transform -translate-x-1/2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Update failed.</div>
          <Toast.Toggle onClick={() => setShowErrorToast(false)} />
        </Toast>
      )}
      <div className="flex justify-between mb-5">
        <div className="col-md-6">
          <Avatar
            img={
              profileData && profileData.image
                ? profileData.image
                : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            size="xl"
          >
            <div className="space-y-1 font-medium dark:text-white">
              <div className="text-white text-3xl">{profileData.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-l">
                Joined in {profileData.createdAt}
              </div>
            </div>
          </Avatar>
        </div>
        <div className="col-md-6 mt-5">
          <Button
            className="mt-5"
            onClick={() => {
              setIsDisabled(!isDisabled);
              if (!isDisabled) {
                updateProfile();
              }
            }}
          >
            {isDisabled ? (
              <HiPencil className="mr-2 h-5 w-5" />
            ) : (
              <HiOutlineCheck className="mr-2 h-5 w-5" />
            )}
            {isDisabled ? "Edit Profile" : "Confirm"}
          </Button>
        </div>
      </div>
      <div className="container gap-4">
        <div className="flex max-w-md flex-col gap-4">
          <Label className="text-white text-xl" htmlFor="disabledInput1">
            Email
          </Label>
          <TextInput
            type="text"
            id="disabledInput1"
            placeholder={profileData.email}
            disabled={isDisabled}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Label className="text-white text-xl" htmlFor="disabledInput3">
            Phone
          </Label>
          <TextInput
            type="text"
            id="disabledInput3"
            placeholder={profileData.phoneNumber}
            disabled={isDisabled}
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <Label className="text-white text-xl" htmlFor="genderSelect">
            Gender
          </Label>
          <Select
            disabled={isDisabled}
            label={formData.gender}
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            dismissOnClick={false}
          >
            <option>Male</option>
            <option>Female</option>
          </Select>
        </div>
      </div>
    </>
  );
}
