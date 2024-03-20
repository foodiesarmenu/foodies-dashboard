import { Button, Checkbox, Label, Modal, TextInput, Select, Toggle, ToggleSwitch } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function UpdateModal({ item, categories, setItems, type }) {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const [formData, setFormData] = useState(
        type === 'restaurant' ? {
            name: '',
            email: '',
            password: '',
            address: '',
            description: '',
            phoneNumber: '',
            canDeliver: false,
            city: '',
            category: [],
            status: 'active',
            image: null,
        } : {
            name: '',
            description: '',
        }
    );


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const { data } = await axios.patch(`https://foodies-backend-1.onrender.com/dashboard/admin/${type}/${item._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log(formData);
            console.log(data);
            if (data.success === true) {
                setOpenModal(false);
                setItems((prevItems) => {
                    const index = prevItems.findIndex((r) => r._id === item._id);
                    const newItems = [...prevItems];
                    newItems[index] = data.data;
                    return newItems;
                });

            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
        setIsLoading(false);

    };

    useEffect(() => {
        setFormData(item);
    }, [item]);

    return (
        <>
            <Button onClick={() => setOpenModal(true)} color="cyan" outline className="mr-2">Update</Button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} className='dark'>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        {
                            type === 'restaurant' ? (
                                <>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Restaurant</h3>
                                    <TextInput id="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
                                    <TextInput id="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                                    <TextInput id="address" placeholder="Address" required value={formData.address} onChange={handleChange} />
                                    <TextInput id="description" placeholder="Description" required value={formData.description} onChange={handleChange} />
                                    <TextInput id="phoneNumber" placeholder="Phone Number" required value={formData.phoneNumber} onChange={handleChange} />
                                    <Label htmlFor="canDeliver" value="Can Deliver" />
                                    <ToggleSwitch checked={formData.canDeliver} label="Toggle me" onChange={() => setFormData({ ...formData, canDeliver: !formData.canDeliver })} />
                                    <TextInput id="city" placeholder="City" required value={formData.city} onChange={handleChange} />
                                    <Label htmlFor="category" value="Category" />
                                    <Select id="category" value={formData.category} onChange={handleChange}>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <Label htmlFor="status" value="Status" />
                                    <Select id="status" value={formData.status} onChange={handleChange}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Select>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Category</h3>
                                    <TextInput id="name" placeholder="Category Name" required value={formData.name} onChange={handleChange} />
                                    <TextInput id="description" placeholder="Description" required value={formData.description} onChange={handleChange} />
                                </>
                            )
                        }

                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                        <div className="w-full">
                            <Button onClick={handleSubmit}>
                                {isLoading ? <i className='fa fa-spin fa-spinner'></i> : `Update `}

                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}