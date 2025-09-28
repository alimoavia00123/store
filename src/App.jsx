import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './component/Navbar';
import Navpic from './component/Navpic';
import Box from './component/Box';
import Intro from './component/Intro';
import Manu from './component/Manu';
import Button from './component/Button';
import Fetch from './component/Fetch';
import Alert from './component/Alert';
import Signup from './component/Signup';
import Login from './component/Login';
import Footer from './component/Footer';

import AdminPanel from "./admin/AdminPanel";
import Dashboard from "./admin/Dashboard";
import Analytics from "./admin/Analytics";
import Order from './admin/Order';
import Customer from './admin/Customer';
import Sales from './admin/Sales';
import Messages from './admin/Messages';
import Addproducts from './admin/Addproducts';
import Allproducts from './admin/Allproducts';
import Accounts from './admin/Accounts';
import Settings from './admin/Settings';
import Help from './admin/Help';
import AdminRole from './admin/Adminrole';
import { Link } from "react-router-dom";

// Not Found Component
const NotFound = () => (

  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>404 - Page Not Found 😢</h1>
    <p>The page you are looking for doesn’t exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);

function App() {
return ( <BrowserRouter> <Routes>
{/* Public Routes */}
<Route
path="/"
element={ <div> <Navbar/> <Navpic/> <Box/> <Intro/> <Manu/> <Button/> <Fetch/> <Alert/> <Footer/> </div>
}
/>
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />

```
    {/* Protected Admin Routes */}
    <Route
      path="/admin"
      element={
        <AdminRole allowedRoles={["admin"]}>
          <AdminPanel />
        </AdminRole>
      }
    >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="order" element={<Order />} />
      <Route path="customer" element={<Customer />} />
      <Route path="sales" element={<Sales />} />
      <Route path="messages" element={<Messages />} />
      <Route path="addproducts" element={<Addproducts />} />
      <Route path="allproducts" element={<Allproducts />} />
      <Route path="accounts" element={<Accounts />} />
      <Route path="settings" element={<Settings />} />
      <Route path="help" element={<Help />} />
    </Route>

    {/* Catch-all route (404 page) */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

);
}

export default App;
      