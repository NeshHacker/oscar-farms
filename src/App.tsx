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
import Services from "./components/Services";
import BlogPage from "./components/BlogPage";
import ContactPage from "./components/ContactPage";
import SchoolsPage from "./components/SchoolsPage";

// ── Homepage: only the essentials ──────────────────────────────────────────
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
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
        <Route path="/blog"      element={<BlogPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/schools"   element={<SchoolsPage />} />
        <Route path="/careers"   element={<CareerPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;