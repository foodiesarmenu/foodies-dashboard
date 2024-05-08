import React from 'react'
import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/3.svg'

export default function notFound() {
  return (
    <div className="flex flex-col items-center justify-center  text-center bg-gray-900 text-white">
      <img src={notFoundImage} alt="Not Found" className="w-max h-96" />
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h3 className="text-2xl font-semibold">Page not found</h3>
      <p className="mt-2">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
      <Link to="/" className="mt-8 px-4 py-2 font-semibold text-black bg-white rounded hover:bg-gray-200">Go Home</Link>
    </div>
  );
}