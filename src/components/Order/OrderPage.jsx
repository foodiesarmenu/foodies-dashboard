import React, { useEffect, useState } from "react";
import { Table, Card, Button, Pagination } from "flowbite-react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Component } from "../Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import Order from "./Order";

export default function OrderPage() {
  const [Orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async (page = 1) => {
    setIsLoading(true);
    const limit = 10;
    const skip = (page - 1) * limit;
    try {
      const { data } = await axios.get(
        `https://foodies-backend-1.onrender.com/dashboard/vendor/order?order=desc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setOrders(data.data);
      setCurrentPage(data.currentPage);
      setNumberOfPages(data.numberOfPages);
      console.log(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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
        <Order />
      </div>
      <div className="flex overflow-x-auto sm:justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={numberOfPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}
