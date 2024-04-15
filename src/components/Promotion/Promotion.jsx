import React, { useEffect, useState } from 'react'
import { Button, Card } from "flowbite-react";
import axios from 'axios';
import Loader from '../Loader/Loader';
export default function Promotion() {



    const [promotion, setPromotion] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getPromotion = async () => {

        try {
            const { data } = await axios.get('https://foodies-backend-1.onrender.com/dashboard/restaurant/promotion',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
            if (data.success) {
                console.log(data);
                setPromotion(data.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
    }


    const changeStatus = async (id, status) => {
        try {
            const { data } = await axios.patch(`https://foodies-backend-1.onrender.com/dashboard/restaurant/promotion/${id}`
                ,
                {
                    isActive: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }

            )
            if (data.success) {
                console.log(data);
                getPromotion()
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getPromotion()
    }
        , [])



    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <Loader />
                </div>

            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {promotion?.map((promo) => (
                        <Card
                            key={promo._id}
                            className="max-w-sm shadow-lg "
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={promo.image}
                        >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {promo.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {promo.description}
                            </p>
                            <Button
                                color={promo.isActive ? 'failure' : 'success'}
                                onClick={() => changeStatus(promo._id, !promo.isActive)}
                            >{promo.isActive ? 'DeActivate' : 'Active'}</Button>
                        </Card>
                    ))}
                </div>
            )
            }
        </>

    )
}