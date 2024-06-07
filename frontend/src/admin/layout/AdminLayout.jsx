import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <Sidebar />
        <div><Outlet /></div>
      </div>
    </>
  );
};

export default AdminLayout;
