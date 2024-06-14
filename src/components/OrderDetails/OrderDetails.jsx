import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import Loader from '../Loader/Loader';
import { Component } from '../Breadcrumb/Breadcrumb';

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);


  const fetchOrder = async (page = 1) => {
    setIsLoading(true);
    const limit = 10;
    const skip = (page - 1) * limit;
    try {
      const { data } = await axios.get(`http://localhost:3000/dashboard/vendor/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setOrder(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const updateStatus = async () => {
    try {
      console.log(`Bearer ${localStorage.getItem('accessToken')}`);
      setButtonIsLoading(true);
      const { data } = await axios.patch(`http://localhost:3000/dashboard/vendor/order/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setOrder(data.data);
      setButtonIsLoading(false);
    } catch (error) {
      setButtonIsLoading(false);
      console.log(error);
    }
  }

  const statusColors = {
    'pending': 'orange',
    'preparing': 'green',
    'rejected': 'red',
    'delivered': 'blue'
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
        <div className="container">
          <div className="flex justify-between mb-8">
            <Component second="Dashboard" third="Orders" fourth="Order Details" />
          </div>
          <Card className="max-w shadow-lg m-4">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
              Order #{order?._id}
            </h5>
            <p className="font-normal text-gray-700">
              <strong>User:</strong> {order?.userId?.name}
            </p>
            <p className="font-normal text-gray-700">
              <strong>Delivery Address:</strong> {order?.deliveryAddress?.firstAddress}, {order?.deliveryAddress?.secondAddress}, {order?.deliveryAddress?.buildingNumber}, {order?.deliveryAddress?.streetName}, {order?.deliveryAddress?.floorNumber}, {order?.deliveryAddress?.apartmentNumber}
            </p>
            <p className="font-normal text-gray-700">
              <strong>Status: </strong>
              <span style={{ color: statusColors[order?.status] }}>
                {order?.status}
              </span>
            </p>
            <h6 className="text-xl font-bold tracking-tight text-gray-900">
              Cart Items
            </h6>
            {order?.cartItems?.map((item, index) => (
              <p key={index} className="font-normal text-gray-700">
                {item?.meal?.name} - {item?.quantity} <span className=' fw-bolder'>-</span> {item?.price} = {item?.totalPrice}
              </p>
            ))}
            <p className="font-normal text-gray-700">
              <strong>Payment Method:</strong> {order?.paymentMethod === 'cash' ?
                <i class="fa-solid fa-money-bills fa-xl" style={{ color: "#FFD43B" }}></i>
                : <i className="fa-brands fa-cc-visa fa-xl" style={{ color: "#FFD43B" }}></i>}
            </p>
            <p className="font-normal text-gray-700">
              <strong>Number of Cart Items:</strong> {order?.noOfCartItems}
            </p>
            <p className="font-normal text-gray-700">
              <strong>Total Price:</strong> {order?.totalPriceAfterDiscount}
            </p>
            <Button onClick={() => updateStatus()}>{buttonIsLoading ? <i className='fa fa-spin fa-spinner'></i> : 'Start Preparing'}</Button>
          </Card>

        </div>
      )}

    </>
  );
}