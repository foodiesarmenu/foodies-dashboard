import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards,HiUser } from 'react-icons/hi';
import { IoFastFood } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { IoMenu } from 'react-icons/io5';
import { IoRestaurantOutline } from "react-icons/io5";
import TokenContext from "../../Context/userContext";
export default function SideBar() {
  const navigator = useNavigate()

  const { userType } = useContext(TokenContext)
  const [isAdmin, setIsAdmin] = useState(false)
  console.log(userType);
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigator('/login')
  }

  useEffect(() => {
    if (userType === 'Admin') {
      setIsAdmin(true)
    }
    else {
      setIsAdmin(false)
    }
  }, [userType])

  return (
    <>
      {isAdmin ? (
        <Sidebar aria-label="Sidebar with logo branding example" className="dark">
          <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
            Foodies
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col justify-between h-full">
              <Sidebar.Item icon={HiChartPie}>
                <Link to="/">Dashboard</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={IoRestaurantOutline}>
                <Link to="/restaurants"> Restaurant</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiInbox}>
                <Link to="/categories">Categories</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiUser}>
                <Link to="/profile">Profile</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={MdMenuBook}>
                <Link to="/menu">menu</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={IoFastFood}>
                <Link to="/Meals">Meals</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiArrowSmRight} className="mt-auto">
                <Button onClick={handleLogout} className="w-full" color={'failure'}>Logout</Button                      

              </Sidebar.Item>

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      ) : <>
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
              <Sidebar.Item icon={HiUser}>
                <Link to="/profile">Profile</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={IoMenu}>
                <Link to="/menu">menu</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={BiSolidOffer}>
                <Link to="/promotions">promotions</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiArrowSmRight} className="mt-auto">
                <Button onClick={handleLogout} className="w-full" color={'failure'}>Logout</Button>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </>}
    </>
  );
}
