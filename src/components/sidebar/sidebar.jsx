import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { IoRestaurantOutline } from "react-icons/io5";
export default function SideBar() {
  return (
    // <>

    //   <ul className="mx-auto vh-100 ">
    //     <li className="list-group-item mt-2">
    //       <Link to="" className="list-group-item">
    //         <i className="fas fa-home me-4"></i>
    //         Dashboard
    //       </Link>
    //     </li>

    //     <li className="list-group-item mt-5">
    //       <Link to="orderlist" className="list-group-item">
    //         <i className="fa-solid fa-list me-4"></i>Order List
    //       </Link>
    //     </li>
    //     <li className="list-group-item mt-5">
    //       <Link to="orderdetails" className="list-group-item">
    //         <i className="fa-solid fa-file me-4"></i> Order Detail
    //       </Link>
    //     </li>
    //     <li className="list-group-item mt-5">
    //       <Link to="customer" className="list-group-item">
    //         <i className="fa-solid fa-users me-4"></i>Customer
    //       </Link>
    //     </li>
    //     <li className="list-group-item mt-5">
    //       <Link to="analytics" className="list-group-item">
    //         <i className="fa-solid fa-chart-simple me-4"></i>Analytics
    //       </Link>
    //     </li>
    //     <li className="list-group-item mt-5">
    //       <Link to="/chat" className="list-group-item">
    //         <i className="fa-regular fa-message me-4"></i>Chat
    //       </Link>
    //     </li>
    //     <li className="list-group-item mt-5">
    //       <Link to="wallet" className="list-group-item">
    //         <i className="fa-solid fa-wallet me-4"></i>Wallet
    //       </Link>
    //     </li>
    //     <li className="list-group-item mt-5">
    //       <p>Foodies Admin dashboard
    //         2024 All rights are reserved</p>
    //     </li>

    //   </ul>
    // </>

    <>

      <Sidebar aria-label="Sidebar with logo branding example" className="dark">
        <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
          Foodies
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              <Link to="/">Dashboard</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={IoRestaurantOutline}>
              <Link to="/restaurants"> Restaurant</Link>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}>
              <Link to="/categories">Categories</Link>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
