import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-money rounded-md flex items-center justify-center">
      <img
        src="https://framerusercontent.com/images/SBTOIM4J28uMUhlWm9rsn1qc.png"
        alt="Money Mediia Logo"
        className="w-6 h-6"
      />
    </div>
    <span className="font-display font-bold text-xl">Money Mediia</span>
  </div>
);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  {
    name: "Portfolio",
    path: "/portfolio",
    submenu: [
      { name: "Videos", path: "/portfolio/videos" },
      { name: "Blogs", path: "/portfolio/blogs" },
    ],
  },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to services with search query parameter
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="z-50 transition-transform hover:scale-105">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.submenu && setActiveSubmenu(link.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {link.submenu ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 rounded-md font-medium transition-colors",
                        isActivePath(link.path)
                          ? "text-money-teal bg-money-teal/10"
                          : "hover:text-money-teal hover:bg-money-teal/5"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeSubmenu === link.name && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[180px] transition-all duration-200 border border-gray-100",
                        activeSubmenu === link.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      )}
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.name}
                          to={sublink.path}
                          className={cn(
                            "block px-4 py-2 hover:bg-money-teal/5 hover:text-money-teal transition-colors",
                            isActivePath(sublink.path) &&
                              "text-money-teal bg-money-teal/5"
                          )}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "px-4 py-2 rounded-md font-medium transition-colors",
                      isActivePath(link.path)
                        ? "text-money-teal bg-money-teal/10"
                        : "hover:text-money-teal hover:bg-money-teal/5"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {/* Inline Search Form */}
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-money-teal focus:ring-1 focus:ring-money-teal"
                />
              </div>
            </form>
            <Button className="btn-gradient px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-shadow">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-money-teal/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-money-teal" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-all duration-300 lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <nav className="h-full overflow-y-auto">
          <div className="pt-24 px-6 pb-8">
            {/* Mobile Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for services, content, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 focus:border-money-teal focus:ring-1 focus:ring-money-teal"
                />
              </div>
            </form>

            {navLinks.map((link) => (
              <div key={link.name} className="mb-2">
                {link.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(link.name)}
                      className={cn(
                        "flex items-center justify-between w-full py-3 px-4 rounded-lg font-medium transition-colors",
                        activeSubmenu === link.name &&
                          "bg-money-teal/10 text-money-teal"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeSubmenu === link.name && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-200",
                        activeSubmenu === link.name ? "max-h-96" : "max-h-0"
                      )}
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.name}
                          to={sublink.path}
                          className={cn(
                            "block py-2 px-4 rounded-lg transition-colors",
                            isActivePath(sublink.path)
                              ? "text-money-teal bg-money-teal/10"
                              : "hover:text-money-teal hover:bg-money-teal/5"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "block py-3 px-4 rounded-lg font-medium transition-colors",
                      isActivePath(link.path)
                        ? "text-money-teal bg-money-teal/10"
                        : "hover:text-money-teal hover:bg-money-teal/5"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-8">
              <Button
                className="btn-gradient w-full py-3 font-medium shadow-lg"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/contact");
                }}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
