import React, { useState } from "react";
import "../Signup/Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/auth/forgot-password", {
      email,
    })
      .then((response) => {
        if (response.data.status) {
          alert("Password reset link sent to your email");
          navigate("/login");
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

        <button type="submit" className="btn font-serif">
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
