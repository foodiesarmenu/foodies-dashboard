import React from "react";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="row d-flex">
        <div className="col-md-2 bg-danger">
          <div className="head p-3">
            <h1 className="">Menu</h1>
            <p>Admin Dashboard</p>
          </div>

          <Sidebar />
        </div>
        <div className="col-md-10">
          <h1>
            <Outlet> </Outlet>
          </h1>
        </div>
      </div>
    </>
  );
}
