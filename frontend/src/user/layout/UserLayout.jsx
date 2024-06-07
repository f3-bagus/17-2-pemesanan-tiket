import React from "react";
import NavbarComponents from "../components/NavbarComponent";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <NavbarComponents />
        <div><Outlet /></div>
    </>
  );
};

export default UserLayout;
