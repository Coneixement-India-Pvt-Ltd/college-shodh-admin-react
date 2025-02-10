import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorBoundary from "./ErrorBoundary";

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role))
    return <Navigate to="/dashboard" replace />;

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <Element />
      </Suspense>
    </ErrorBoundary>
  );
};


export default ProtectedRoute;

// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const ProtectedRoute = (props) => {
//   const { Component } = props;
//   const navigate = useNavigate();
//   useEffect(() => {
//     let login = localStorage.getItem("token");
//     if (!login) {
//       navigate("/login");
//     }
//     }, [navigate]);

//   return (
//     <div>
//       <Component />
//     </div>
//   );
// };

// export default ProtectedRoute;
