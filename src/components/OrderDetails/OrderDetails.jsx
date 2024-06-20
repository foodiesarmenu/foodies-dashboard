import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge, Button, Card, Select } from "flowbite-react";
import Loader from "../Loader/Loader";
import { Component } from "../Breadcrumb/Breadcrumb";
import SuccessToast from "../Toast/success";
import ErrorToast from "../Toast/error";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const fetchOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setOrder(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      setButtonIsLoading(true);
      const { data } = await axios.patch(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/order/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setOrder(data.data);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
      setButtonIsLoading(false);
    } catch (error) {
      setButtonIsLoading(false);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
      console.log(error);
    }
  };

  const statusColors = {
    pending: "warning",
    preparing: "blue",
    rejected: "red",
    delivered: "green",
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <>
          {showSuccessToast && (
            <SuccessToast
              setShowSuccessToast={setShowSuccessToast}
              message={"Order status updated successfully"}
            />
          )}

          {showErrorToast && (
            <ErrorToast
              setShowErrorToast={setShowErrorToast}
              message={"Failed to update status"}
            />
          )}

          <div className="container">
            <div className="flex justify-between mb-8">
              <Component
                second="Dashboard"
                third="Orders"
                fourth="Order Details"
              />
            </div>
            <Card className="dark:bg-white bg-white max-w shadow-lg m-4">
              <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  Order #{order?._id}
                </h5>
                <div className="w-32">
                  <Select
                    value={order?.status}
                    onChange={(e) => updateStatus(e.target.value)}
                    className="w-full inline-block"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="rejected">Rejected</option>
                    <option value="delivered">Delivered</option>
                  </Select>
                </div>
              </div>

              <p className="font-normal text-gray-700">
                <strong>User:</strong> {order?.userId?.name}
              </p>
              <p className="font-normal text-gray-700">
                <strong>Delivery Address:</strong>{" "}
                {order?.deliveryAddress?.firstAddress},{" "}
                {order?.deliveryAddress?.secondAddress},{" "}
                {order?.deliveryAddress?.buildingNumber},{" "}
                {order?.deliveryAddress?.streetName},{" "}
                {order?.deliveryAddress?.floorNumber},{" "}
                {order?.deliveryAddress?.apartmentNumber}
              </p>
              <p className="flex gap-2 font-normal text-gray-700">
                <strong>Status: </strong>
                <div className="w-16 mt-1">
                  <Badge color={statusColors[order?.status]} className="w-full">
                    {order?.status}
                  </Badge>
                </div>
              </p>
              <h6 className="text-xl font-bold tracking-tight text-gray-900">
                Cart Items
              </h6>
              {order?.cartItems?.map((item, index) => (
                <p key={index} className="font-normal text-gray-700">
                  {item?.meal?.name} - {item?.quantity}{" "}
                  <span className="fw-bolder">-</span> {item?.price} ={" "}
                  {item?.totalPrice}
                </p>
              ))}
              <p className="font-normal text-gray-700">
                <strong>Payment Method:</strong>{" "}
                {order?.paymentMethod === "cash" ? (
                  <i
                    className="fa-solid fa-money-bills fa-xl"
                    style={{ color: "#FFD43B" }}
                  ></i>
                ) : (
                  <i
                    className="fa-brands fa-cc-visa fa-xl"
                    style={{ color: "#FFD43B" }}
                  ></i>
                )}
              </p>
              <p className="font-normal text-gray-700">
                <strong>Number of Cart Items:</strong> {order?.noOfCartItems}
              </p>
              <p className="font-normal text-gray-700">
                <strong>Total Price:</strong>{" "}
                {order?.totalPriceAfterDiscount
                  ? order?.totalPriceAfterDiscount
                  : order?.cartTotalPrice}
              </p>
              {order?.status === "pending" && (
                <Button
                  color="success"
                  className="w-full p-2 bg-blue-500 text-white rounded"
                  onClick={() => updateStatus("preparing")}
                  isLoading={buttonIsLoading}
                >
                  Accept Order
                </Button>
              )}
            </Card>
          </div>
        </>
      )}
    </>
  );
}
