import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import ProductPage from "./pages/ProductPage/ProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage/CartPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import DashBoard from "./pages/Admin/Dashboard/DashBoard";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { addNotification } from "./slices/userSlice";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("wss://refurbished-store.onrender.com");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {user && (
          <>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </>
        )}
        {user && user.isAdmin && (
          <>
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/product/:id/edit" element={<EditProduct />} />
          </>
        )}

        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
