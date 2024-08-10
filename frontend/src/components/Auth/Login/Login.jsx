import React, { useState } from "react";
import "../Signup/Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          console.log("Login successful, navigating to /dashboard");
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
            src="./background.jpg"
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

              <h1 className="-mb-20 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                Welcome to CollegeShodh
              </h1>

              {/* <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p> */}

              
            </div>

            {/* <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="#" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form> */}

            <div className="sign-up-container">
              <form action="" className="sign-up-form" onSubmit={handleSubmit}>
                <h2 className="mb-5 text-xl font-serif font-semibold">Login</h2>
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
