import React from "react";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";

export default function Layout() {
  
  return (
    <>
    
      <div className="flex flex-row h-screen overflow-hidden text-gray-800 dark:text-white">
        <div className="bg-white dark:bg-gray-800 fixed transition-all duration-500 ease-in-out h-screen overflow-auto border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
        </div>
        <div className="w-full ml-64 bg-gray-900 transition-all duration-500 ease-in-out overflow-auto">
          <NavBar />
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}