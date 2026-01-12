import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar activeMenu={activeMenu} />
      {user && <div className="container mx-auto px-4 py-8">{children}</div>}
    </div>
  );
};

export default DashboardLayout;
