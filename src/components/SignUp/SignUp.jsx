import React, { useState } from 'react';
import { Button, Checkbox, Datepicker, Label, TextInput, Toast } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [imageFile, setImageFile] = useState(null); // New state variable for the image file

    const navigate = useNavigate();

    const register = async (values) => {
        setIsLoading(true);
        setApiError('');
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });
        formData.append('image', imageFile);
        try {
            const { data } = await axios.post('https://foodies-backend-1.onrender.com/dashboard/admin', formData);
            setIsLoading(false);

            if (data.success === true)
                navigate('/login');
        } catch (error) {
            setApiError(error.response ? error.response.data.message : 'An error occurred');
            setIsLoading(false);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(15, 'Name is too long').required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        countryCode: Yup.string().matches(/^\d{2}$/, 'Please enter an Egyptian number').required('Country code is required'),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/gm, 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required('Password is required'),
        phoneNumber: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Please enter an Egyptian number').required('Phone number is required'),
        gender: Yup.string().matches(/^(Male|Female)$/, 'Invalid gender').required('Gender is required'),
        dateOfBirth: Yup.date()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            countryCode: '',
            password: '',
            phoneNumber: '',
            gender: '',
            dateOfBirth: '',

        },
        validationSchema,
        onSubmit: (values) => {
            register(values);
        },
    });

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden lg:flex flex-col w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529391387768-ab39476d6a52?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                {/* Optional content for the image side */}
            </div>
            <div className="flex flex-col justify-center px-4 lg:px-8 w-full max-w-md m-auto">
                <h1 className="text-3xl font-bold mb-6">Register</h1>
                <form onSubmit={formik.handleSubmit}>


                    <div className="mb-4 ">
                        <label className="text-gray-700 block mb-2" htmlFor="image">
                            Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            className="w-64"
                            onChange={(event) => setImageFile(event.currentTarget.files[0])}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700 block mb-2" htmlFor="name">
                            Name
                        </label>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />

                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700 block mb-2" htmlFor="email">
                            Email
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            icon={HiMail}
                            placeholder="name@flowbite.com"
                            required
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700 block mb-2" htmlFor="password">
                            Password
                        </label>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="*********"
                            required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-row mb-4">
                        <div className="w-1/3 pr-2">
                            <label className="text-gray-700 block mb-2" htmlFor="country-code">
                                Country Code
                            </label>
                            <TextInput
                                id="countryCode"
                                type="tel"
                                placeholder="+2"
                                maxLength="4"
                                required
                                value={formik.values.countryCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.countryCode && formik.errors.countryCode ? (
                                <div className="text-red-500">{formik.errors.countryCode}</div>
                            ) : null}
                        </div>
                        <div className="w-2/3 pl-2">
                            <label className="text-gray-700 block mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <TextInput
                                id="phoneNumber"
                                type="tel"
                                placeholder="0123456789"
                                required
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className="text-red-500">{formik.errors.phoneNumber}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700 block mb-2" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            id="dateOfBirth"
                            className='form-control rounded'
                            type='date'
                            value={formik.values.dateOfBirth}
                            placeholder={new Date().toLocaleDateString()}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                            <div className="text-red-500">{formik.errors.dateOfBirth}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-row mb-4">
                        <div className="flex items-center mr-2">
                            <input id="male" type="radio" value="Male" name="gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                        </div>
                        <div className="flex items-center">
                            <input id="female" type="radio" value="Female" name="gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="Submit" disabled={isLoading}>
                        {isLoading ? <i className='fa fa-spin fa-spinner'></i> : 'Register'}
                    </Button>

                    {apiError && <div className="text-red-500 mt-4">{apiError}</div>}

                    <p className="text-sm text-center text-gray-400 mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
