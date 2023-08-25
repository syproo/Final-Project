import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./dashboard routes/ProtectedRoute.jsx";
import ForgotPassword from "./components/forgotpaswword/ForgotPassword";
import AdminProtectedRoute from "./dashboard routes/AdminProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Orders from "./pages/Admin/Orders";
import Products from "./pages/Admin/Products";
import Dashboard from "./pages/User/UserDashboard";
import UserOrders from "./pages/User/userOrders";
import UserProfile from "./pages/User/UserProfile";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/*User Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        {/*Admin Dashboard Routes */}
        <Route path="/dashboard" element={<AdminProtectedRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
