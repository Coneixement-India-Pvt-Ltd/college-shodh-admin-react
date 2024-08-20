import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardHome from "../Dashboard/DashboardHome";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar />
      <Sidebar />
      <DashboardHome/>
    </>
  );
};

export default Dashboard;
