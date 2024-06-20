import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import TokenContext from "../../Context/userContext";
import axios from "axios";
import { format } from 'date-fns';
import SuccessToast from "../Toast/success";
import ErrorToast from "../Toast/error";
import Loader from "../Loader/Loader";

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
  const { user, getUserData } = useContext(TokenContext);
  const [coupons, setCoupons] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  const getCoupons = async () => {
    try {
      const response = await axios.get(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/Coupon/restaurant/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setCoupons(response.data.data);
      setLoading(false);
      console.log(response.data.data);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      if (userData) {
        getCoupons();
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    if (!user?._id) {
      console.error("User ID is null");
      return;
    }
    try {
      const { data } = await axios.post(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/Coupon`,
        {
          ...values,
          restaurant: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const coupon = data.data;
      setCoupons([...coupons, coupon]);
      resetForm();
      setMessage('Coupon Added Successfully');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } catch (error) {
      console.log(error);
      setMessage(error.response ? error.response.data.message : "An error occurred");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
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
      setMessage('Coupon Deleted Successfully');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } catch (error) {
      console.error(error);
      setMessage(error.response ? error.response.data.message : "An error occurred");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <>
          {showSuccessToast && (
            <SuccessToast setShowSuccessToast={setShowSuccessToast} message={message} />
          )}

          {showErrorToast && (
            <ErrorToast setShowErrorToast={setShowErrorToast} message={message} />
          )}

          <div className="p-4 grid grid-cols-4 gap-4">
            <Card className="dark:bg-gray-800 dark:text-white col-span-3">
              <h1 className="text-2xl font-bold">Add Coupon</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field
                        type="text"
                        name="code"
                        placeholder="Coupon Code"
                        className={`w-full p-2 border ${errors.code && touched.code ? 'border-red-500' : 'border-gray-300'} rounded`}
                      />
                      <ErrorMessage name="code" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <Field
                        type="date"
                        name="expires"
                        className={`w-full p-2 border ${errors.expires && touched.expires ? 'border-red-500' : 'border-gray-300'} rounded`}
                      />
                      <ErrorMessage name="expires" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <Field
                        type="number"
                        name="discount"
                        placeholder="Discount"
                        className={`w-full p-2 border ${errors.discount && touched.discount ? 'border-red-500' : 'border-gray-300'} rounded`}
                      />
                      <ErrorMessage name="discount" component="div" className="text-red-500" />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-2 bg-blue-500 text-white rounded"
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </Card>
            <div className="div"></div>

            {coupons.length > 0 ? (
              coupons.map((coupon, index) => (
                <Card
                  key={index}
                  className="dark:bg-white relative p-4 border w-75 border-gray-300 bg-white rounded mt-4 mb-4"
                >
                  <div className="flex">
                    <h2 className="text-xl mt-1 font-bold">Coupon Code: {coupon.code}</h2>
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
        </>
      )}
    </>
  );
}
