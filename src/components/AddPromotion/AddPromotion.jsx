import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import axios from 'axios';

export default function AddPromotion({ setPromotion }) {
    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        if (e.target.id === 'image') {
            setFormData({ ...formData, [e.target.id]: e.target.files[0] });
        } else if (e.target.id === 'isActive') {
            setFormData({ ...formData, isActive: e.target.value });
            console.log(formData);
        } else {
            setFormData({ ...formData, [e.target.id]: e.target.value });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const Data = new FormData();
        Object.keys(formData).forEach(key => Data.append(key, formData[key]));
        try {
            console.log(Data);
            const { data } = await axios.post('https://foodies-backend-1.onrender.com/dashboard/restaurant/promotion', Data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (data.success) {
                console.log(data.data);
                setPromotion(data.data);
                setOpenModal(false);
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.log(error);
        }
        setIsLoading(false);

    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)} color="cyan" outline className="ms-auto mb-3">Add</Button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} className='dark'>
                <Modal.Header />
                <Modal.Body>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`Add `}</h3>
                        <TextInput id="title" placeholder="Promotion title" required onChange={handleChange} />
                        <TextInput id="description" placeholder="Description" required onChange={handleChange} />
                        <Label htmlFor="image" value="Image" />
                        <input id="image" type="file" onChange={handleChange} />
                        <Label htmlFor="status" value="Status" />
                        <Select id="isActive" onChange={handleChange} >
                            <option value={1}>Active</option>
                            <option value={2}>Inactive</option>
                        </Select>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <div className="w-full">
                            <Button type="submit">
                                {isLoading ? <i className='fa fa-spin fa-spinner'></i> : `Add `}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}