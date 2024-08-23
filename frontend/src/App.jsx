// import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Signup from './components/Auth/Signup/Signup';
// import Login from './components/Auth/Login/Login';
// import Home from './components/Home';
// import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
// import ResetPassword from './components/Auth/ForgotPassword/ResetPassword';
// import AdminPage from './components/Admin_panel/AdminPage';
// import CollegesPage from './components/Colleges/CollegesPage';
// import CreatePage from './components/Create_form/CreatePage';
// import UsersPage from './components/Users/UsersPage';
// import ProductPage from './components/Products/ProductPage';
// import AddBulkPage from './components/Add_bulk/AddBulkPage';
// import Navbar from './components/Admin_panel/Navbar';
// import Sidebar from './components/Admin_panel/Sidebar';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgotPassword" element={<ForgotPassword />} />
//         <Route path="/resetPassword/:token" element={<ResetPassword />} />
//         <Route path="/dashboard" element={<AdminPage/>} />
//         <Route path="/dashboard/college" element={<CollegesPage/>} />
//         <Route path="/dashboard/create" element={<CreatePage/>} />
//         <Route path="/dashboard/create-bulk" element={<AddBulkPage/>} />
//         {/* <Route path="/dashboard/users" element={<UsersPage/>} />
//         <Route path="/dashboard/products" element={<ProductPage/>} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import Home from './components/Home';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ForgotPassword/ResetPassword';
import AdminPage from './components/Admin_panel/AdminPage';
import CollegesPage from './components/Colleges/CollegesPage';
import CreatePage from './components/Create_form/CreatePage';
import AddBulkPage from './components/Add_bulk/AddBulkPage';
import Navbar from './components/Admin_panel/Navbar';
import Sidebar from './components/Admin_panel/Sidebar';

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ width: '100%' }}>
          {children}
        </div>
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

        {/* Dashboard routes */}
        <Route 
          path="/dashboard" 
          element={
            <DashboardLayout>
              <AdminPage />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/college" 
          element={
            <DashboardLayout>
              <CollegesPage />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/create" 
          element={
            <DashboardLayout>
              <CreatePage />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/create-bulk" 
          element={
            <DashboardLayout>
              <AddBulkPage />
            </DashboardLayout>
          } 
        />
        {/* Add more dashboard routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
