import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
export default function LogIn() {

    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const register = async (values) => {
        setIsLoading(true);
        setApiError('');
        try {
            const { data } = await axios.post('https://foodies-backend-1.onrender.com/dashboard/auth/login', values);
            setIsLoading(false);
            console.log(data);
            if (data) {
                setIsLoading(false)
                localStorage.setItem('accessToken', data.accessToken)
                navigate('/')
            }
        } catch (error) {
            setApiError(error.response ? error.response.data.message : 'An error occurred');
            setIsLoading(false);
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/gm, 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character').required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',


        },
        validationSchema,
        onSubmit: (values) => {
            register(values);
        },
    });
    return (
        <>

            <div className="flex min-h-screen bg-gray-100">
                <div className="hidden lg:flex flex-col w-1/2 bg-cover bg-center " style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529391387768-ab39476d6a52?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                    {/* Optional content for the image side */}
                </div>
                <div className="flex flex-col justify-center px-4 lg:px-8 w-full max-w-md m-auto">
                    <h1 className="text-3xl font-bold mb-6">Login</h1>
                    <form onSubmit={formik.handleSubmit}>

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

                        <Button type="Submit" disabled={isLoading}>
                            {isLoading ? <i className='fa fa-spin fa-spinner'></i> : 'Login'}
                        </Button>

                        {apiError && <div className="text-red-500 mt-4">{apiError}</div>}

                        <p className="text-sm text-center text-gray-400 mt-4">
                            You don't have an account?{' '}
                            <Link to="/signUp" className="text-indigo-400 hover:underline">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
