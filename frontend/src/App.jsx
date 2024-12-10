import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminPage from "./pages/AdminPage";
import CollegesPage from "./pages/CollegesPage";
import CreatePage from "./pages/CreatePage";
import AddBulkPage from "./pages/AddBulkPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Error from "./components/Error";
import Edit from "./pages/Edit";
import BlogPage from "./pages/BlogPage";
import ProtectedRoute from "./components/ProtectedRoute";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />

        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <ProtectedRoute Component={AdminPage}  />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/college"
          element={
            <DashboardLayout>
              <ProtectedRoute Component={CollegesPage}  />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/create"
          element={
            <DashboardLayout>
              <ProtectedRoute Component={CreatePage}  />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/upload"
          element={
            <DashboardLayout>
              <ProtectedRoute Component={AddBulkPage}  />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/edit/:id"
          element={
            <DashboardLayout>
              <ProtectedRoute Component={Edit}  />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/blogs"
          element={
            <DashboardLayout>
              <ProtectedRoute Component={BlogPage}  />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
