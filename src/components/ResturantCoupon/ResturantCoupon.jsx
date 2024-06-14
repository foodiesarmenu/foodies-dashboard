import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Card } from "flowbite-react";
import TokenContext from "../../Context/userContext";
import axios from "axios";
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
  console.log(user.user._id);

  const handleSubmit = async (values, { resetForm }) => {
    if (!user.user._id) {
      console.error("User ID is null");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4000/dashboard/admin/Coupon`,
        {
          ...values,
          restaurant: user.user._id,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJlMmM2YTcyMGYwMDJmZDI0YzY5MmEiLCJlbWFpbCI6ImVoYWJAZ21haWwuY29tIiwiY291bnRyeUNvZGUiOiIyMCIsInBob25lTnVtYmVyIjoiMDExNTcwMDMzNjAiLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE3MDcwNjg1MDcsImV4cCI6MTczODYyNjEwN30.QzgNEv3fa7xNhST7ap1M5-ogRY20Rgu3549DbO972jlF_xhIiME56GMuROPlXNqcMMA-sWyEe-BFQvAE0FHODCZnH0g1b_iHjS8XBHSmgzrwiDxoiDNGqLxtv2-uFWegkevaItk10Rb43dwKDwUQV4M_EuPnDFZnx8QbLRuJmUkpSy08wcQCIPNZBFfqCtYOxv4hKrhDXx3i9yvvXBdVCT0O_rpGFCivqbtTSyjovzgYIHlTnKstrt1QojKTyKCsEYGuiPnDKZbJI70zLFgrKcoI889k6PynSBwOyP1GURmQfxyr8o9_siTxbzJCgTbnAisXD0F5urm3G5bNOyyiPg`,
          },
        }
      );

      const coupon = await response.json();
      setCoupons([...coupons, coupon]);
      resetForm();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/dashboard/admin/Coupon/restaurant/${user.user._id}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJlMmM2YTcyMGYwMDJmZDI0YzY5MmEiLCJlbWFpbCI6ImVoYWJAZ21haWwuY29tIiwiY291bnRyeUNvZGUiOiIyMCIsInBob25lTnVtYmVyIjoiMDExNTcwMDMzNjAiLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE3MDcwNjg1MDcsImV4cCI6MTczODYyNjEwN30.QzgNEv3fa7xNhST7ap1M5-ogRY20Rgu3549DbO972jlF_xhIiME56GMuROPlXNqcMMA-sWyEe-BFQvAE0FHODCZnH0g1b_iHjS8XBHSmgzrwiDxoiDNGqLxtv2-uFWegkevaItk10Rb43dwKDwUQV4M_EuPnDFZnx8QbLRuJmUkpSy08wcQCIPNZBFfqCtYOxv4hKrhDXx3i9yvvXBdVCT0O_rpGFCivqbtTSyjovzgYIHlTnKstrt1QojKTyKCsEYGuiPnDKZbJI70zLFgrKcoI889k6PynSBwOyP1GURmQfxyr8o9_siTxbzJCgTbnAisXD0F5urm3G5bNOyyiPg`,
            },
          }
        );

        setCoupons(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getCoupons();
  }, []);

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <Card className="col-span-3">
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
          <div
            key={index}
            className="p-4 border w-75 border-gray-300 bg-white rounded mt-4 mb-4"
          >
            <div className="flex">
              <h2 className="text-xl mt-1 ">Coupon Code: </h2>
              <h2 className=" text-2xl font-bold ml-2 mb-2">{coupon.code}</h2>
            </div>

            <p>Expiry Date: {coupon.expires}</p>
            <p>Discount: {coupon.discount}%</p>
          </div>
        ))
      ) : (
        <p className="text-white">No coupons available.</p>
      )}
    </div>
  );
}
