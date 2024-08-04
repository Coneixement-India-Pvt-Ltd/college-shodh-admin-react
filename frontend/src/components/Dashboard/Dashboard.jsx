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

            } else {
                navigate('/')
            }

        })
    }, [])

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/verify")
//       .then((res) => {
//         if (res.data.status) {
//           navigate("/dashboard");
//         } else {
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         navigate("/");
//       });
//   }, [navigate]);



  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;


