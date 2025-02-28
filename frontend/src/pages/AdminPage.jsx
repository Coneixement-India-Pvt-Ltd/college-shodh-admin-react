import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/Dashboard/DashboardHome";
import { BASE_URL } from "../constants.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/dashboard/`,
          {
            withCredentials: true, // Send cookies with the request
          }
        );

        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
         // navigate("/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login"); // Redirect to login if there's an error
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (!isAuthenticated) {
    return <p>Loading...</p>; // Optionally render a loading state while checking auth
  }

  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <DashboardHome />
    </>
  );
};

export default Dashboard;
