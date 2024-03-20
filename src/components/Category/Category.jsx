import React, { useEffect, useState } from "react";
import { Card, Table, Button, Pagination } from 'flowbite-react';
import axios from 'axios';
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import Loader from "../Loader/Loader";
import AddModal from "../AddModal/AddModal";

export default function Category() {
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [numnerOfRecordes, setNumberOfRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async (page) => {
        setIsLoading(true);
        const limit = 10;
        const skip = (page - 1) * limit;
        try {
            const { data } = await axios.get(`https://foodies-backend-1.onrender.com/dashboard/admin/category?limit=${limit}&skip=${skip}&paginate=true`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log(data);
            setCategories(data.data);
            setNumberOfPages(data.numberOfPages);
            setNumberOfRecords(data.numberOfRecords);
            setCurrentPage(data.currentPage);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(page);
        fetchCategories(page);
    };

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-white text-3xl">categorys</h1>
                <AddModal categories={categories} setItems={setCategories} type={'category'} />
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
                                <Table.HeadCell>description</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y ">
                                {categories.map((category) => (
                                    <Table.Row key={category._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            <img src={category.image} alt={category.name} className="h-10 w-10 rounded-full" />
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {category.name}
                                        </Table.Cell>
                                        <Table.Cell>{category.description}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex flex-row">
                                                <UpdateModal item={category} setItems={setCategories} type={'category'} />
                                                <DeleteModal categoryId={category._id} setCategories={setCategories} />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={currentPage} totalPages={numberOfPages} onPageChange={onPageChange} showIcons />
                    </div>
                </section>
            )}
        </>
    );
}