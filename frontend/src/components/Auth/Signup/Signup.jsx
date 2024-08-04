import React, { useState } from "react";
import "../Signup/Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          alert("Sign Up successful");
          // console.log(response);
          navigate("/login");
        } 
        else {
          // setError("Something went wrong. Please try again.");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setError("An error occurred. Please try again."); 
      });      
  };

  return (
    <div className="sign-up-container">
      <form action="" className="sign-up-form" onSubmit={handleSubmit}>
        <h2 className="mb-5 text-xl font-serif font-semibold">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>}

        <label className="font-serif" htmlFor="username">
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
          required
        />

        <label className="font-serif" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          placeholder="********"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn font-serif">
          Sign Up
        </button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

