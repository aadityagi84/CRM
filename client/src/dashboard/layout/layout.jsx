import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <p>Welcome to the dashboard!</p>
        <Outlet /> {/* ✅ Render nested routes here */}
      </main>
      <footer>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
};

export default Layout;
