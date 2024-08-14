import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import Home from './components/Home';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ForgotPassword/ResetPassword';
import AdminPage from './components/Admin_panel/AdminPage';
import CollegesPage from './components/Colleges/CollegesPage';
import InboxPage from './components/Inbox/InboxPage';
import UsersPage from './components/Users/UsersPage';
import ProductPage from './components/Products/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<AdminPage/>} />
        <Route path="/dashboard/college" element={<CollegesPage/>} />
        <Route path="/dashboard/inbox" element={<InboxPage/>} />
        <Route path="/dashboard/users" element={<UsersPage/>} />
        <Route path="/dashboard/products" element={<ProductPage/>} />
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
