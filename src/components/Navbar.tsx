import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigateToSection } from "@/utils/smoothScroll";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Adicionar useNavigate
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", type: "home" },
    { name: "Sobre", href: "/#about", type: "section" },
    { name: "Soluções", href: "/#solutions", type: "section" },
    { name: "Portfólio", href: "/#portfolio", type: "section" },
    { name: "Automações completas", href: "/#automations", type: "section" },
    { name: "Contato", href: "/#contact", type: "section" },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);

    if (link.type === "home" && isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link.type === "section") {
      navigateToSection(link.href, isHomePage, navigate);
    } else if (link.type === "route") {
      // ✅ Usar navigate para rotas internas
      navigate(link.href);
    } else if (link.type === "home") {
      // ✅ Usar navigate para ir para home
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-5">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png"
              alt="QRZ Tech Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="text-gray-300 hover:text-qrz-orange text-base font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/5527999936682"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 border border-qrz-orange text-base font-medium rounded-md text-qrz-orange hover:bg-qrz-orange/10 transition-colors"
            >
              Fale Conosco
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              <svg
                className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://wa.me/5527999936682"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 mt-4 text-base font-medium text-center rounded-md bg-qrz-orange text-white"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;