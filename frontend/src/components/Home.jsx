// import axios from "axios";
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();
//   axios.defaults.withCredentials = true;

//   // const handleLogout = () => {
//   //   axios.get("http://localhost:3000/auth/logout")
//   //   .then(res => {
//   //     if(res.data.status) {
//   //       navigate('/login')
//   //     }
//   //   }).catch(err => {
//   //     console.error(err);  
//   // })
//   // }
 
//   return (
//     <>
//       <div className="font-medium text-2xl text-orange-600">
//         Hello from Home Page - Admin Dashboard
//       </div>

//       <button>
//         <Link
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 mt-5"
//           to="/dashboard"
//         >
//           Dashboard
//         </Link>
//       </button>

//       <button>
//         <Link
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           to="/login"
//         >
//           Login
//         </Link>
//       </button>
// {/* 
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
//       onClick={handleLogout}>
//         Logout
//       </button> */}
//     </>
//   );
// };

// export default Home;

import React from 'react'

const Home = () => {
  return (
    <div>

<section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Welcome to CollegeShodh
        <strong className="font-extrabold text-orange-500 sm:block"> Admin Panel </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Discover Bachelor's Program in Science, Technology, Engineering and Mathematics!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-orange-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/dashboard"
        >
          Dashboard
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-950 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="/login"
        >
          Login
        </a>
      </div>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default Home
