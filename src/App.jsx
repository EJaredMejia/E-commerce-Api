import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import LoadingScreen from "./Components/LoadingScreen";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import ProductDetail from "./Components/ProductDetail";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Purchases from "./Components/Purchases";
import SignUp from "./Components/SignUp";

function App() {
  const isLoading = useSelector((state) => state.app.isLoading);

  return (
    <HashRouter>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
