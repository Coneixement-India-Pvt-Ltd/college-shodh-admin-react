import React, { useState } from "react";
import "../Signup/Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="./images/background.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img
                src="./images/collegeShodh.png"
                alt="College-Shodh Logo"
                className="h-10 sm:h-12 object-cover"
                style={{ borderRadius: "10%" }}
              />
            </a>

            <h2 className="mt-10 mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to College<span className="text-orange-500">Shodh</span>
            </h2>

            <p className="mb-24 leading-relaxed text-white">
              This page provides access to the administrative dashboard where
              you can manage and oversee the operations of the platform. As an
              admin, you play a crucial role in maintaining the accuracy and
              functionality of College-Shodh.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-4 py-4 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
                <img
                  src="./images/collegeShodh.png"
                  alt="College-Shodh Logo"
                  className="h-10 sm:h-12 object-cover"
                  style={{ borderRadius: "10%" }}
                />
              </a>
              {/* <h1 className="-mb-20 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                Welcome to CollegeShodh
              </h1>{" "}
            
              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p> */}
            </div>

            <div className="sign-up-container">
              <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                <h2 className="mb-2 text-xl font-serif font-semibold">Login</h2>
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
                  Login
                </button>

                <Link to="/forgotpassword">Forgot Password?</Link>

                <p>
                  Don't have an Account? <Link to="/signup">Signup</Link>{" "}
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
