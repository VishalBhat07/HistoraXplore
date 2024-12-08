import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Explore from "./pages/Explore/Explore";
import Discuss from "./pages/Discuss/Discuss";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Hero />} />
          <Route path={"/explore"} element={<Explore />} />
          <Route path={"/discuss"} element={<Discuss />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
