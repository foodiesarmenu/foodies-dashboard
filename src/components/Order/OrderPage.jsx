import React, { useEffect, useState } from "react";
import { Table, Card, Button, Pagination } from "flowbite-react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Component } from "../Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

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

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : (
          <Table
            hoverable={true}
            className="w-full bg-gray-200 shadow-md rounded-lg"
          >
            <Table.Head className="bg-gray-800">
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                #
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Order ID
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                User
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Adderss
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Payment Method
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Created At
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Total Price
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {Orders.map((order, index) => (
                <React.Fragment key={order._id}>
                  <Table.Row className="border-t border-gray-200">
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell className="text-bold">{order._id}</Table.Cell>
                    <Table.Cell>{order?.userId?.name}</Table.Cell>
                    <Table.Cell>
                      {order?.deliveryAddress?.firstAddress},
                    </Table.Cell>
                    <Table.Cell>
                      {order?.paymentMethod}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(order.createdAt).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell className="text-black font-bold">
                      {order?.totalPriceAfterDiscount
                        ? order?.totalPriceAfterDiscount
                        : order?.cartTotalPrice}{" "}
                      EGP
                    </Table.Cell>
                    <Table.Cell>
                    <Button color="warning"><Link to={`/order/${order._id}/details`} color="warning">View</Link>
                    </Button>
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              ))}
            </Table.Body>
          </Table>
        )}
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
