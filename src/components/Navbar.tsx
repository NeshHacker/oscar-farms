import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  {
    label: "Products",
    dropdown: [
      { label: "🥑 Avocado Seedlings",   to: "/products?type=avocado" },
      { label: "🌰 Macadamia Seedlings", to: "/products?type=macadamia" },
      { label: "🌾 Seasonal Produce",    to: "/products?type=seasonal" },
      { label: "🛒 Order Seedlings",     to: "/products?type=cart" },
    ],
  },
  {
    label: "Services",
    dropdown: [
      { label: "Consultancy",     to: "/services#consultancy" },
      { label: "Training",        to: "/services#training" },
      { label: "Tree Initiative", to: "/services#tree-initiative" },
    ],
  },
  { label: "Schools",  to: "/schools" },
  { label: "Blog",     to: "/blog" },
  { label: "About",    to: "/about" },
  { label: "Contact",  to: "/contact" },
];

type DropdownItem = { label: string; to: string };
type NavLink = { label: string; to?: string; dropdown?: DropdownItem[] };

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DropdownMenu({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-stone-50 border border-green-100 rounded-2xl shadow-xl shadow-green-900/10 overflow-hidden z-50">
      {items.map((item) => (
        <Link key={item.label} to={item.to} onClick={onClose}
          className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-green-900 hover:bg-green-50 hover:text-green-700 transition-colors border-b border-green-50 last:border-0">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-500 flex-shrink-0" />
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function NavItem({ link, mobile = false, onClose }: { link: NavLink; mobile?: boolean; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (mobile) {
    return (
      <div>
        <button
          onClick={() => {
            if (link.dropdown) {
              setOpen(!open);
            } else if (link.to) {
              navigate(link.to);
              onClose?.();
            }
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-green-900 hover:bg-green-50 rounded-xl transition-colors">
          {link.label}
          {link.dropdown && <ChevronIcon open={open} />}
        </button>
        {link.dropdown && open && (
          <div className="ml-4 border-l-2 border-green-100 pl-3 mb-1">
            {link.dropdown.map((item) => (
              <Link key={item.label} to={item.to} onClick={onClose}
                className="flex items-center gap-2 py-2 px-2 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <li ref={ref} className="relative">
      {link.dropdown ? (
        <button onClick={() => setOpen(!open)}
          className={`flex items-center text-sm font-bold tracking-wide transition-colors hover:text-lime-300 ${open ? "text-lime-300" : "text-white/90"}`}>
          {link.label}
          <ChevronIcon open={open} />
        </button>
      ) : (
        <Link to={link.to!}
          className="flex items-center text-sm font-bold tracking-wide text-white/90 hover:text-lime-300 transition-colors">
          {link.label}
        </Link>
      )}
      {link.dropdown && open && <DropdownMenu items={link.dropdown} onClose={() => setOpen(false)} />}
    </li>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-lime-500" />
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-green-950/95 backdrop-blur-md shadow-lg shadow-green-900/30" : "bg-green-900"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-green-700 border-2 border-lime-400/50 overflow-hidden flex items-center justify-center">
                <img src="/projects/logo.png" alt="Oscar Farms" className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = "🌱";
                  }} />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white leading-none tracking-wide">Oscar Farms</h1>
                <p className="text-xs text-lime-400 font-semibold leading-none mt-0.5">Quality Seedlings</p>
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => <NavItem key={link.label} link={link} />)}
            </ul>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link to="/products"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-sm shadow hover:-translate-y-0.5 transition-all">
                🌿 Order Seedlings
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors" aria-label="Toggle menu">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-screen" : "max-h-0"}`}>
          <div className="bg-stone-50 mx-3 mb-3 rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            <div className="p-3">
              {navLinks.map((link) => (
                <NavItem key={link.label} link={link} mobile onClose={() => setMobileOpen(false)} />
              ))}
            </div>
            <div className="px-4 pb-4">
              <Link to="/products"
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-500 text-white font-bold text-sm shadow text-center">
                🌿 Order Seedlings
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}