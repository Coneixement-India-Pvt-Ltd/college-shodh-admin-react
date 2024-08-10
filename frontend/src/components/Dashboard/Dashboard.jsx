import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/auth/verify')
        .then(res => {
            if(res.data.status) {
                // navigate("/dashboard");
            } else {
                navigate('/login')
            }

        })
    }, [])


  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
    .then(res => {
      if(res.data.status) {
        navigate('/')
      }
    }).catch(err => {
      console.error(err);  
  })
  }



  return (
    <div>
      <h1>Dashboard</h1>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;


