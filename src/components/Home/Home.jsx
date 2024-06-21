import React from "react";
import MyChart from "../BarChart/BarChart"; // Replace with actual import path
import PieChart from "../PaiChart/PaiChart"; // Replace with actual import path
import Order from "../Order/Order";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Total Orders Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
        <h1 className="text-3xl font-bold text-gray-300 text-center">Restaurant Sales Analytics</h1>
        </div>
        <div></div>
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-lg text-gray-300 font-semibold mb-4">
            Total Orders
          </h2>
          <div className="text-xl text-gray-300 font-bold">8 Order</div>{" "}
          {/* Dynamic data should replace this placeholder */}
        </div>
        {/* Total Money Card */}
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-lg text-gray-300 font-semibold mb-4">
            Total Money
          </h2>
          <div className="text-xl text-gray-300 font-bold">$1560</div>{" "}
          {/* Dynamic data should replace this placeholder */}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Sales Chart Card */}
        <div className="bg-white shadow-md rounded-lg p-4 h-100">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales Chart</h2>
          <div className="h-full">
            <div className="h-64 aspect-w-4 aspect-h-3">
              <MyChart />
            </div>
          </div>
        </div>
        {/* Product Distribution Chart Card */}
        <div className="bg-white shadow-md rounded-lg p-4 h-100">
          <h2 className="text-lg font-semibold mb-4">Product Distribution</h2>
          <div className="h-full">
            {" "}
            <div className=" aspect-h-4">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
      <div className="div">
      <h1 className="text-3xl font-bold text-gray-200 m-5">Latest Orders</h1>
        <Order />
      </div>
    </div>
  );
}
