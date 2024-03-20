import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';

import { Toast } from 'flowbite-react';
import { HiFire } from 'react-icons/hi';

import ToastDeleted from '../ToastDeleted/ToastDeleted';

export default function DeleteModal({ itemId, setItems, type }) {
    const [openModal, setOpenModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleDelete = async (itemId) => {
        try {
            const { data } = await axios.delete(`https://foodies-backend-1.onrender.com/dashboard/admin/${type}/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (data.success) {
                setItems(data.data);
                setShowToast(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {showToast && <ToastDeleted />}

            <Button onClick={() => {
                setOpenModal(true);
            }} color="red" outline>Delete</Button>

            <Modal show={openModal} size="md" className='dark' onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this {type}?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                setOpenModal(false);
                                handleDelete(itemId)
                            }}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}