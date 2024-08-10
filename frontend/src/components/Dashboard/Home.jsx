import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // const handleLogout = () => {
  //   axios.get("http://localhost:3000/auth/logout")
  //   .then(res => {
  //     if(res.data.status) {
  //       navigate('/login')
  //     }
  //   }).catch(err => {
  //     console.error(err);  
  // })
  // }
 
  return (
    <>
      <div className="font-medium text-2xl text-orange-600">
        Hello from Home Page - Admin Dashboard
      </div>

      <button>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 mt-5"
          to="/dashboard"
        >
          Dashboard
        </Link>
      </button>

      <button>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/login"
        >
          Login
        </Link>
      </button>
{/* 
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
      onClick={handleLogout}>
        Logout
      </button> */}
    </>
  );
};

export default Home;
