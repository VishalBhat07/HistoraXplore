import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Explore from "./components/Explore/Explore";
import Footer from "./components/Footer/Footer";
import Explore from "./pages/Explore/Explore";
import Discuss from "./pages/Discuss/Discuss";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Hero />} />
          <Route path={"/explore"} element={<Explore />} />
          <Route path={"/discuss"} element={<Discuss />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
