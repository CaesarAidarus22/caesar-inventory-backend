import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/admin/Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/admin/Register";


import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import ProductList from "../pages/public/ProductList";
import Products from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

import Dashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PUBLIC */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<ProductList />} />
        </Route>

        {/* ADMIN */}

        <Route
        path="/admin"
        element={
            <ProtectedRoute>
            <AdminLayout />
            </ProtectedRoute>
        }
        >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
};



export default AppRoutes;