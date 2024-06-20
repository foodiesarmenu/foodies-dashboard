import React, { useEffect, useState } from "react";
import { Table, Pagination } from 'flowbite-react';
import axios from 'axios';
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import Loader from "../Loader/Loader";
import AddModal from "../AddModal/AddModal";
import {Component} from "../Breadcrumb/Breadcrumb";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]); 

    const fetchRestaurants = async (page = 1) => {
        setIsLoading(true);
        const limit = 10;
        const skip = (page - 1) * limit;
        try {
            const { data } = await axios.get(`https://foodies-backend-1.onrender.com/dashboard/admin/restaurant?limit=${limit}&skip=${skip}&paginate=true`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setRestaurants(data.data);
            setCurrentPage(data.currentPage);
            setNumberOfPages(data.numberOfPages);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } 
    }

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('https://foodies-backend-1.onrender.com/dashboard/admin/category?limit=20', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setCategories(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchRestaurants(currentPage);
    }, [currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="flex justify-between">
                <Component second="Dashboard" third="Restaurant" />
                <AddModal categories={categories} setItems={setRestaurants} type="restaurant" />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <Loader />
                </div>
            ) : (
                <section className="pt-6 ">
                    <div className="overflow-x-auto ">
                        <Table hoverable className="dark">
                            <Table.Head>
                                <Table.HeadCell>Image</Table.HeadCell>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Address</Table.HeadCell>
                                <Table.HeadCell>Phone Number</Table.HeadCell>
                                <Table.HeadCell>Can Deliver</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y ">
                                {restaurants.map((restaurant) => (
                                    <Table.Row key={restaurant._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            <img src={restaurant.image} alt={restaurant.name} className="h-10 w-10 rounded-full" />
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {restaurant.name}
                                        </Table.Cell>
                                        <Table.Cell>{restaurant.email}</Table.Cell>
                                        <Table.Cell>{restaurant.address}</Table.Cell>
                                        <Table.Cell>{restaurant.phoneNumber}</Table.Cell>
                                        <Table.Cell>{restaurant.canDeliver ? 'Yes' : 'No'}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex flex-row">
                                                <UpdateModal item={restaurant} categories={categories} setItems={setRestaurants} type="restaurant" />
                                                <DeleteModal itemId={restaurant._id} setItems={setRestaurants} type="restaurant" />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={currentPage} totalPages={numberOfPages} onPageChange={onPageChange} showIcons />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
