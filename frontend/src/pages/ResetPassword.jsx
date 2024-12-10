import React, { useState } from "react";
import "../styles/Signup.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/auth/reset-password/" + token, {
      password,
    })
      .then((response) => {
        if (response.data.status) {
          alert("Password reset successful");
          navigate("/login");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
      <form action="" className="sign-up-form" onSubmit={handleSubmit}>
        <h2 className="mb-5 text-xl font-serif font-semibold">
          Reset Password
        </h2>

        <label className="font-serif" htmlFor="password">
          New Password:
        </label>
        <input
          type="password"
          placeholder="********"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn font-serif">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
