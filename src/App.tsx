import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page components
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Community from "./components/Community";
import SeedlingsSelector from "./components/SeedlingsSelector";
import CareerPage from "./components/CareersPage";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Services from "./components/Services";
import SchoolsPage from "./components/SchoolsPage";

// ── Homepage: only the essentials ──────────────────────────────────────────
function Home() {
  return (
    <>
      <Hero />
      <About preview />
      <Products preview />
    </>
  );
}

// ── App shell ───────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/products"  element={<><SeedlingsSelector /><Products /></>} />
        <Route path="/about"     element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/blog"      element={<Blog />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/schools"   element={<SchoolsPage />} />
        <Route path="/careers"   element={<CareerPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;