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
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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

        <p>Don't have an Account? <Link to="/signup">Signup</Link> </p>
         
      </form>
    </div>
  );
};

export default Login;
