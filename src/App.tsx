import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { useAppSelector } from "./store";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const location = useLocation();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
