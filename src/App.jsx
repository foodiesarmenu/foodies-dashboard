import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import OrderList from "./components/OrderList/OrderList";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Customer from "./components/Customer/Customer";
import Analytics from "./components/Analytics/Analytics";
import Wallet from "./components/Wallet/Wallet";
import NotFound from "./components/NotFound/notFound";


let routers = createBrowserRouter([
  {path: '', element: <Layout />, children: [
    {index: true, element:<Home />},
    {path: 'OrderList', element:<OrderList />},
    {path: 'OrderDetails', element:<OrderDetails />},
    {path: 'Customer', element:<Customer />},
    {path: 'Analytics', element:<Analytics />},
    {path: 'Wallet', element:<Wallet />},
    {path:"*", element: <NotFound />}
  ]},
]);

function App() {
  return (
    <>
      <RouterProvider router={routers} ></RouterProvider>
  
    </>
  );
}

export default App;
