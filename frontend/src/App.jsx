import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Explore from "./components/Explore/Explore";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
