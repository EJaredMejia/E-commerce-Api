import { useState } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FiltersSideBar from "./Components/FiltersSideBar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import LoadingScreen from "./Components/LoadingScreen";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import ProductDetail from "./Components/ProductDetail";
import Purchases from "./Components/Purchases";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
      <Footer />
      <FiltersSideBar />
    </HashRouter>
  );
}

export default App;
