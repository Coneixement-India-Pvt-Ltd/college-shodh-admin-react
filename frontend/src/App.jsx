import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { lazy, Suspense } from "react";
import DashboardLayout from "./components/DashboardLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

// Lazy-loaded pages
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CollegesPage = lazy(() => import("./pages/CollegesPage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));
const AddBulkPage = lazy(() => import("./pages/AddBulkPage"));
const Edit = lazy(() => import("./pages/Edit"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const Error = lazy(() => import("./components/Error"));

const App = () => {
  return (
    <AuthProvider>
       <Toaster /> 
      <Router>
        <Suspense fallback={<Loader/>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route path="*" element={<Error />} />

              {/* Dashboard Routes with Protected Access */}
              <Route
                path="/dashboard"
                element={
                  <DashboardLayout>
                    <ProtectedRoute
                      element={AdminPage}
                      allowedRoles={["admin","viewer"]}
                    />
                  </DashboardLayout>
                }
              />
              <Route
                path="/dashboard/college"
                element={
                  <DashboardLayout>
                    <ProtectedRoute
                      element={CollegesPage}
                      allowedRoles={["admin", "editor", "viewer"]}
                    />
                  </DashboardLayout>
                }
              />
              <Route
                path="/dashboard/create"
                element={
                  <DashboardLayout>
                    <ProtectedRoute
                      element={CreatePage}
                      allowedRoles={["admin", "editor"]}
                    />
                  </DashboardLayout>
                }
              />
              <Route
                path="/dashboard/upload"
                element={
                  <DashboardLayout>
                    <ProtectedRoute
                      element={AddBulkPage}
                      allowedRoles={["admin"]}
                    />
                  </DashboardLayout>
                }
              />
              <Route
                path="/dashboard/edit/:id"
                element={
                  <DashboardLayout>
                    <ProtectedRoute
                      element={Edit}
                      allowedRoles={["admin", "editor"]}
                    />
                  </DashboardLayout>
                }
              />
              <Route
                path="/dashboard/blogs"
                element={
                  <DashboardLayout>
                    <ProtectedRoute
                      element={BlogPage}
                      allowedRoles={["admin", "editor"]}
                    />
                  </DashboardLayout>
                }
              />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
