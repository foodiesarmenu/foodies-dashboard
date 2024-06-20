import React from "react";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";

export default function Layout() {

  return (
    <>
      <div className="dark flex flex-row h-screen overflow-hidden text-gray-800 dark:text-white">
        <div className="bg-white dark:bg-gray-800 fixed transition-all duration-500 ease-in-out h-screen">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full ml-64 bg-gray-900 transition-all duration-500 ease-in-out overflow-auto">
          <NavBar />
          <div className="p-8 flex-grow overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}