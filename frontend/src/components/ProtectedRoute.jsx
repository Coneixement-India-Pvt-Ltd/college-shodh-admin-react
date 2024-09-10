import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("token");
    if (!login) {
      navigate("/login");
    }
    }, [navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
