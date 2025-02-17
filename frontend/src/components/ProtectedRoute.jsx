import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorBoundary from "./ErrorBoundary";
import { toast } from "react-toastify";

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)){
    toast.error("You are not allowed to access this page ❌")
    return <Navigate to="/dashboard" replace />;
  }


  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
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
