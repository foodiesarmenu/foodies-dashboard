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
import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import TokenContext from "../../Context/userContext";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { userType } = useContext(TokenContext);
  let type = userType;


  const fetchProfile = async () => {
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;
    const id = decodedToken._id;
    let url;
    if (type === "Admin") {
      url = `https://foodies-backend-1.onrender.com/dashboard/admin/profile/${email}`;
    } else if (type === "Restaurant") {
      url = `https://foodies-backend-1.onrender.com/dashboard/admin/restaurant/${id}`;
    }
    try {
      setIsLoading(true);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWhhYlRhcmVrQWRtaW4iLCJfaWQiOiI2NjE5YjQ1OGU3MjE1YWFjMGZmMDQ5NDUiLCJpbWFnZSI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGx2bmRjMDhhL2ltYWdlL3VwbG9hZC92MTcxMjk2MDU5OC9wcm9maWxlL3N5aXRneWh6aXlkN2Z0cmFhcWt6LmpwZyIsImVtYWlsIjoiRWhhYlRhcmVrQWRtaW5AZ21haWwuY29tIiwiY291bnRyeUNvZGUiOiIyMCIsInBob25lTnVtYmVyIjoiMDExNTcwMDMzNTAiLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE3MTUxNTYyMDAsImV4cCI6MTc0NjcxMzgwMH0.jNlUPIBOG86lLln8Og5MsdfqO0LiI0iP2dWJgFdmWVoG3QzJ8tsZN6TlWobcPSt3VQ-Ph-Yz0yu_yXr6px8-lKsPpLYDdRLNdu1H_tvddC7Fzr3kmskP8vQmaRPyaNmJUQ_r_wtaEQfuQintQaL10Gwx_tSw6DHajDZTzBQsLZpFdgQ0BG6daRiBkResVYZgGhZhHcqBYNIhbLgXJ1vubDA5kSHtahioXUt1pzGGS5BT9aXA9127YWJqpCK6NE6_WrUuoddL7fhXnpY0nL8yPbw1YmT1uxkHkUf1TCOmK-6K9Fcos-xx8dU-JXI6HWu7JWRENTsSY_bU6sIVb0bRkA`,
        },
      });
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
        `https://foodies-backend-1.onrender.com/dashboard/admin/restaurant/${profileData._id}`,
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
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <>
          {showSuccessToast && (
            <Toast className="fixed top-6 left-1/2 transform -translate-x-1/2">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Updated successfully.
              </div>
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
                  <div className="text-white text-3xl">{profileData?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-l">
                    Joined in{" "}
                    {new Date(profileData?.createdAt).toLocaleDateString()}
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
                placeholder={profileData?.email}
                disabled={isDisabled}
                value={formData?.email}
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
                placeholder={profileData?.phoneNumber}
                disabled={isDisabled}
                value={formData?.phoneNumber}
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
                value={formData?.gender}
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
      )}
    </>
  );
}
