import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useSelector } from "react-redux";
import CreateProduct from "./pages/CreateProduct/CreateProduct";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
