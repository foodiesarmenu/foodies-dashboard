import { Button, Checkbox, Label, Modal, TextInput, Select, Toggle, ToggleSwitch } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

export default function AddItems({ categories, setItems, type }) {
    const [openModal, setOpenModal] = useState(false);
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
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        if (event.target.id === 'image') {
            setFormData({ ...formData, [event.target.id]: event.target.files[0] });
        } else if (event.target.id === 'category') {
            const selectedOptions = Array.from(event.target.selectedOptions);
            const selectedValues = selectedOptions.map(option => option.value);
            setFormData({ ...formData, [event.target.id]: selectedValues });
        } else {
            setFormData({ ...formData, [event.target.id]: event.target.value });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessage('');

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post(`https://foodies-backend-1.onrender.com/dashboard/admin/${type}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setOpenModal(false);
            setItems((prevItems) => [...prevItems, formData]);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }

        setIsLoading(false);
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)} color="cyan" outline className="mr-2">Add</Button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} className='dark'>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`Add `}</h3>

                        {type === 'restaurant' && (
                            <>
                                <TextInput id="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
                                <TextInput id="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                                <TextInput id="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
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
                                <Label htmlFor="image" value="Image" />
                                <input id="image" type="file" onChange={handleChange} />
                            </>
                        )}

                        {type === 'category' && (
                            <>
                                <TextInput id="name" placeholder="Category Name" required value={formData.name} onChange={handleChange} />
                                <TextInput id="description" placeholder="Description" required value={formData.description} onChange={handleChange} />
                                <Label htmlFor="image" value="Image" />
                                <input id="image" type="file" onChange={handleChange} />
                            </>
                        )}

                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                        <div className="w-full">
                            <Button onClick={handleSubmit}>
                                {isLoading ? <i className='fa fa-spin fa-spinner'></i> : `Add `}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}