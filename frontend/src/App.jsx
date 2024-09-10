import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ForgotPassword/ResetPassword";
import AdminPage from "./components/Admin_panel/AdminPage";
import CollegesPage from "./components/Colleges/CollegesPage";
import CreatePage from "./components/Create_form/CreatePage";
import AddBulkPage from "./components/Add_bulk/AddBulkPage";
import Navbar from "./components/Admin_panel/Navbar";
import Sidebar from "./components/Admin_panel/Sidebar";
import Error from "./components/Error";
import Edit from "./components/Edit_form/Edit";
import BlogPage from "./components/Blogs/BlogPage";
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
