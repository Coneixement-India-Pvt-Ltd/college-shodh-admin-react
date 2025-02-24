import React, { useState } from "react";
import "../styles/Signup.css";
import Axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants.js";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${BASE_URL}/auth/signup`, {
        username,
        email,
        password,
      });

      if (response.data.status) {
        toast.success("Signup Successfully");
        navigate("/login");
      } else {
        console.log(response.data);
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="BackgroundImage"
            src="./images/background.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img
                src="./collegeShodh.png"
                alt="College-Shodh Logo"
                className="h-10 sm:h-12 object-cover"
                style={{ borderRadius: "10%" }}
              />
            </a>

            <h2 className="mt-10 mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to College-Shodh 🦑
            </h2>

            <p className="mb-24 leading-relaxed text-white">
              This page provides access to the administrative dashboard where
              you can manage and oversee the operations of the platform. As an
              admin, you play a crucial role in maintaining the accuracy and
              functionality of College-Shodh.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
                <img
                  src="./collegeShodh.png"
                  alt="College-Shodh Logo"
                  className="h-10 sm:h-12 object-cover"
                  style={{ borderRadius: "10%" }}
                />
              </a>

              <h1 className="-mb-12 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                Welcome to CollegeShodh!
              </h1>

              {/* <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p> */}
            </div>

            <div className="sign-up-container">
              <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                <h2 className="mb-5 text-xl font-serif font-semibold">
                  Sign Up
                </h2>

                {error && <p className="text-red-500">{error}</p>}

                <label className="font-serif" htmlFor="email">
                  Username:
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <label className="font-serif" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="font-serif" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="btn font-serif">
                  Sign Up
                </button>

                <p>
                  Have an Account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Signup;
