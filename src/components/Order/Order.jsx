import React, { useEffect, useState } from "react";
import { Table,  Card, Button } from 'flowbite-react';
import axios from 'axios';
import Loader from "../Loader/Loader";
import { Component } from "../Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

export default function Order() {
    const [Orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const CardHeader = ({ children }) => <div className="p-4 border-b border-gray-200">{children}</div>;
    const CardBody = ({ children }) => <div className="p-4">{children}</div>;
    const CardFooter = ({ children }) => <div className="p-4 border-t border-gray-200">{children}</div>;
    const statusColors = {
        'pending': 'orange',
        'preparing': 'green',
        'rejected': 'red',
        'delivered': 'blue'
    };

    const fetchOrders = async (page = 1) => {
        setIsLoading(true);
        const limit = 10;
        const skip = (page - 1) * limit;
        try {
            const { data } = await axios.get(`https://foodies-backend-1.onrender.com/dashboard/vendor/order?order=desc`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setOrders(data.data);
            setCurrentPage(data.currentPage);
            setNumberOfPages(data.numberOfPages);
            console.log(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between mb-8">
                    <Component second="Dashboard" third="Orders" />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <Loader />
                    </div>
                ) : (
                    <div className="flex flex-wrap ">
                        {Orders.map((order) => (
                            <Card className="max-w-sm shadow-lg m-4">
                                <CardHeader>
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Order #{order._id}
                                    </h5>
                                </CardHeader>
                                <CardBody>
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
                                            {item?.meal?.name} - {item?.quantity} x {item?.price} = {item?.totalPrice}
                                        </p>
                                    ))}
                                </CardBody>
                                <CardFooter>
                                    <p className="font-normal text-gray-700 mb-3">
                                        <strong>Total Price:</strong> {order?.totalPriceAfterDiscount ? order?.totalPriceAfterDiscount : order?.cartTotalPrice}
                                    </p>
                                    <Button color="warning"><Link to={`/order/${order._id}/details`} color="warning">View</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}