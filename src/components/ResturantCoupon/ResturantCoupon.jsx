import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Card } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import TokenContext from "../../Context/userContext";
import axios from "axios";
import { format } from 'date-fns';

const initialValues = {
  code: "",
  expires: "",
  discount: "",
};

const validationSchema = Yup.object({
  code: Yup.string().required("Required"),
  expires: Yup.date().required("Required"),
  discount: Yup.number().required("Required"),
});

export default function RestaurantCoupon() {
  const [coupons, setCoupons] = useState([]);
  const user = useContext(TokenContext);
  const [couponCount, setCouponCount] = useState(0);
  console.log(user.user._id);

  const getCoupons = async () => {
    if (!user.user._id) {
      console.error("User ID is null");
      return;
    }
    try {
      const response = await axios.get(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/Coupon/restaurant/${user.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setCoupons(response.data.data);
      console.log(response.data.data);
      setCouponCount(couponCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCoupons();
  }, [couponCount]); 

  const handleSubmit = async (values, { resetForm }) => {
    if (!user.user._id) {
      console.error("User ID is null");
      return;
    }
    try {
      const response = await axios.post(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/Coupon`,
        {
          ...values,
          restaurant: user.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const coupon = await response.json();
      setCoupons([...coupons, coupon]);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/Coupon/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("success", id)
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" p-4 grid grid-cols-4 gap-4">
      <Card className="dark:bg-gray-800 dark:text-white col-span-3">
        <h1 className="text-2xl font-bold">Add Coupon</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <Field
              type="text"
              name="code"
              placeholder="Coupon Code"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Field
              type="date"
              name="expires"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Field
              type="number"
              name="discount"
              placeholder="Discount "
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </Card>
      <div className="div"></div>

      {coupons.length > 0 ? (
        coupons.map((coupon, index) => (
          <Card
          key={index}
          className="relative p-4 border w-75 border-gray-300 bg-white rounded mt-4 mb-4"
        >
          <div className="flex">
            <h2 className="text-xl mt-1 font-bold">Coupon Code: {coupon.code} </h2>
          </div>
          <span className="font-bold">Expiry Date: {format(new Date(coupon.expires), 'dd/MM/yyyy')}</span> 
          <span className="font-bold">Discount: {coupon.discount}%</span>
          <Button
            color="failure"
            className="absolute top-0 right-0 text-white font-bold rounded"
            onClick={() => handleDelete(coupon._id)}
          >
            <MdDelete />
          </Button>
        </Card>
        ))
      ) : (
        <p className="text-white">No coupons available.</p>
      )}
    </div>
  );
}
