import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import OrderList from "./components/OrderList/OrderList";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Analytics from "./components/Analytics/Analytics";
import Wallet from "./components/Wallet/Wallet";
import NotFound from "./components/NotFound/notFound";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Restaurants from "./components/Restaurants/Restaurants";
import Category from "./components/Category/Category";
import Profile from "./components/Profile/Profile";
import Menu from "./components/Menu/Menu";
import Promotion from "./components/Promotion/Promotion";


export default function App() {



  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        {
          index: true, element:
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
        },
        {
          path: 'OrderList', element:
            <ProtectedRoutes>
              <OrderList />
            </ProtectedRoutes>
        },
        {
          path: 'restaurants', element:
            <ProtectedRoutes>
              <Restaurants />
            </ProtectedRoutes>
        },
        {
          path: 'OrderDetails', element:
            <ProtectedRoutes>
              <OrderDetails />
            </ProtectedRoutes>
        },
        {
          path: 'Profile', element:
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
        },
        {
          path: 'menu', element:
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
        },
        {
          path: 'Analytics', element:
            <ProtectedRoutes>
              <Analytics />
            </ProtectedRoutes>
        },
        {
          path: 'Wallet', element:
            <ProtectedRoutes>
              <Wallet />
            </ProtectedRoutes>
        },
        {
          path: 'categories', element:
            <ProtectedRoutes>
              <Category />
            </ProtectedRoutes>
        },
        {
          path: 'promotions', element:
            <ProtectedRoutes>
              <Promotion />
            </ProtectedRoutes>
        },
        { path: "*", element: <NotFound /> }
      ]
    },
    { path: 'login', element: <LogIn /> },
    { path: 'signUp', element: <SignUp /> },
  ]);



  return (
    <>
      <RouterProvider router={routers} ></RouterProvider>
    </>
  );
}

