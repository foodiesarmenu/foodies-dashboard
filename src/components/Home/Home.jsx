import React from 'react';
import MyChart from '../BarChart/BarChart'; // Replace with actual import path
import PieChart from '../PaiChart/PaiChart'; // Replace with actual import path

export default function Home() {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8">Restaurant Sales Analytics</h1>

      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white shadow-md rounded-lg p-4 h-full">
              <h2 className="text-lg font-semibold mb-4">Monthly Sales Chart</h2>
              <div className="h-full">
                <div className="aspect-w-3 aspect-h-2">
                  <MyChart />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white shadow-md rounded-lg p-4 h-full">
              <h2 className="text-lg font-semibold mb-4">Product Distribution</h2>
              <div className="h-full">
                <div className="aspect-w-3 aspect-h-2">
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
