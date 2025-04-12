// src/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './MovieProject/Components/Navbar/Navbar';
import Footer from './MovieProject/Components/Footer/Footer';

const Layout = ({ setSearch }) => {
  const location = useLocation(); // ✅ now this is allowed
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar setSearch={setSearch} />}
      <Outlet />
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
