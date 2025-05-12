import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Search,
  X,
  ChevronDown,
  MessageSquare,
  Calendar,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight,
  Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Define proper TypeScript interface for ScrollToTopLink props
interface ScrollToTopLinkProps {
  to: string;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

// Custom Link component that scrolls to top with proper TypeScript typing
const ScrollToTopLink: React.FC<ScrollToTopLinkProps> = ({
  to,
  className,
  onClick,
  children,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default if we're just changing hash on same page
    if (window.location.pathname === to) {
      e.preventDefault();
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Call the original onClick if provided
    if (onClick) onClick(e);
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
      <img
        src="https://framerusercontent.com/images/SBTOIM4J28uMUhlWm9rsn1qc.png"
        alt="Money Mediia Logo"
        className="w-6 h-6"
      />
    </div>
    <span className="font-display font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
      Money Mediia
    </span>
  </div>
);

// Define interface for submenu items
interface SubmenuItem {
  name: string;
  path: string;
  description: string;
}

// Define interface for nav links
interface NavLink {
  name: string;
  path: string;
  submenu?: SubmenuItem[];
}

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  {
    name: "Portfolio",
    path: "/portfolio",
    submenu: [
      {
        name: "Videos",
        path: "/portfolio/videos",
        description: "Explainer & corporate videos",
      },
      {
        name: "Blogs",
        path: "/portfolio/blogs",
        description: "Financial articles & content",
      },
      // Comment out Case Studies for now since it's not implemented yet
      // {
      //   name: "Case Studies",
      //   path: "/portfolio/case-studies",
      //   description: "Success stories & results"
      // },
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
  const [showTopBar, setShowTopBar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled down
      setIsScrolled(currentScrollY > 10);

      // Hide top bar when scrolling down past 100px
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setShowTopBar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowTopBar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add state variable to track if mouse is over submenu or parent
  const [isMouseOverSubmenu, setIsMouseOverSubmenu] = useState(false);
  const [isMouseOverParent, setIsMouseOverParent] = useState(false);

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  // Function to handle closing the submenu
  const handleCloseSubmenu = () => {
    // Only close if mouse is not over either the button or the submenu
    if (!isMouseOverSubmenu && !isMouseOverParent) {
      setActiveSubmenu(null);
    }
  };

  // Use effect to handle coordinated hover state
  useEffect(() => {
    // If either the button or dropdown has mouse over it, keep menu open
    if (isMouseOverSubmenu || isMouseOverParent) {
      // Keep menu open
    } else {
      // Small delay before closing
      const timer = setTimeout(() => {
        setActiveSubmenu(null);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isMouseOverSubmenu, isMouseOverParent]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Scroll to top before navigating
      window.scrollTo(0, 0);

      // Redirect to the services page with the search query as a parameter
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear the search input after navigating
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Function to handle navigation with scroll to top
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div
        className={`bg-gradient-to-r from-green-700 to-teal-700 text-white py-1.5 transition-all duration-300 border-b border-white/10 ${
          !showTopBar && !isOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center text-xs md:text-sm space-x-4">
            <a
              href="mailto:akshay@moneymediia.com"
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <Mail className="h-3 w-3 mr-1" />
              <span>akshay@moneymediia.com</span>
            </a>
            <a
              href="tel:+918484819808"
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <Phone className="h-3 w-3 mr-1" />
              <span>+91 8484819808</span>
            </a>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <a
              href="https://calendly.com/akshay-satpaise99/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <Calendar className="h-3 w-3 mr-1" />
              <span>Schedule a Call</span>
              <ExternalLink className="h-2 w-2 ml-1" />
            </a>
            <a
              href="https://wa.me/918484819808"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              <span>WhatsApp Support</span>
              <ExternalLink className="h-2 w-2 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg py-3"
            : "bg-white/90 backdrop-blur-md py-3.5 border-b border-gray-100"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <ScrollToTopLink
              to="/"
              className="z-50 transition-transform hover:scale-105"
            >
              <Logo />
            </ScrollToTopLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2.5">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => {
                    if (link.submenu) {
                      setActiveSubmenu(link.name);
                      setIsMouseOverParent(true);
                    }
                  }}
                  onMouseLeave={() => {
                    setIsMouseOverParent(false);
                  }}
                >
                  {link.submenu ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center space-x-1.5 px-4 py-2.5 rounded-lg font-medium transition-all duration-300",
                          isActivePath(link.path)
                            ? "text-white bg-gradient-to-r from-green-600 to-teal-600 shadow-md"
                            : "text-gray-700 hover:text-green-600 hover:bg-green-50/80"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            activeSubmenu === link.name && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Enhanced dropdown for Portfolio */}
                      {link.name === "Portfolio" ? (
                        <div
                          className="absolute top-full left-0 w-[280px] bg-white shadow-xl rounded-xl border border-gray-100 z-50"
                          style={{
                            opacity: activeSubmenu === link.name ? 1 : 0,
                            visibility:
                              activeSubmenu === link.name
                                ? "visible"
                                : "hidden",
                            transform:
                              activeSubmenu === link.name
                                ? "translateY(10px)"
                                : "translateY(-8px)",
                            transition:
                              "opacity 300ms ease, transform 300ms ease, visibility 300ms ease",
                            pointerEvents:
                              activeSubmenu === link.name ? "auto" : "none",
                          }}
                          onMouseEnter={() => {
                            setActiveSubmenu(link.name);
                            setIsMouseOverSubmenu(true);
                          }}
                          onMouseLeave={() => {
                            setIsMouseOverSubmenu(false);
                          }}
                        >
                          <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>

                          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border-b border-gray-100 relative">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              Our Portfolio
                            </h4>
                            <p className="text-sm text-gray-600">
                              Explore our latest work
                            </p>
                          </div>

                          <div className="p-3">
                            {/* Added All Projects link at top */}
                            <ScrollToTopLink
                              to="/portfolio"
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 mb-2",
                                isActivePath("/portfolio") &&
                                  location.pathname === "/portfolio" &&
                                  "text-green-600 bg-gray-50 font-medium"
                              )}
                              onClick={() => {
                                setActiveSubmenu(null);
                                setIsMouseOverSubmenu(false);
                                setIsMouseOverParent(false);
                              }}
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Grid className="w-4 h-4 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium">All Projects</div>
                                <div className="text-xs text-gray-500">
                                  View our complete portfolio
                                </div>
                              </div>
                            </ScrollToTopLink>

                            <div className="h-px bg-gray-100 my-2"></div>

                            {link.submenu.map((sublink) => (
                              <ScrollToTopLink
                                key={sublink.name}
                                to={sublink.path}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-700 hover:bg-gray-50",
                                  isActivePath(sublink.path) &&
                                    "text-green-600 bg-gray-50 font-medium"
                                )}
                                onClick={() => {
                                  setActiveSubmenu(null);
                                  setIsMouseOverSubmenu(false);
                                  setIsMouseOverParent(false);
                                }}
                              >
                                {sublink.name === "Videos" ? (
                                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-4 h-4 text-green-600"
                                    >
                                      <polygon points="23 7 16 12 23 17 23 7" />
                                      <rect
                                        x="1"
                                        y="5"
                                        width="15"
                                        height="14"
                                        rx="2"
                                        ry="2"
                                      />
                                    </svg>
                                  </div>
                                ) : sublink.name === "Blogs" ? (
                                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-4 h-4 text-teal-600"
                                    >
                                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    </svg>
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-4 h-4 text-blue-600"
                                    >
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                      <polyline points="14 2 14 8 20 8"></polyline>
                                      <line
                                        x1="16"
                                        y1="13"
                                        x2="8"
                                        y2="13"
                                      ></line>
                                      <line
                                        x1="16"
                                        y1="17"
                                        x2="8"
                                        y2="17"
                                      ></line>
                                      <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium">
                                    {sublink.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {sublink.description}
                                  </div>
                                </div>
                              </ScrollToTopLink>
                            ))}

                            <ScrollToTopLink
                              to="/contact"
                              className="flex items-center justify-between px-6 py-3 mt-2 border-t border-gray-100 text-green-600 hover:text-green-700 font-medium"
                              onClick={() => {
                                setActiveSubmenu(null);
                                setIsMouseOverSubmenu(false);
                              }}
                            >
                              <span>Start a new project</span>
                              <ArrowRight className="h-4 w-4" />
                            </ScrollToTopLink>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "absolute top-full left-0 bg-white/95 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transition-all duration-300 border border-gray-100",
                            activeSubmenu === link.name
                              ? "opacity-100 visible translate-y-2 max-h-96"
                              : "opacity-0 invisible -translate-y-4 max-h-0 pointer-events-none"
                          )}
                          style={{ minWidth: "180px" }}
                        >
                          <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                          {link.submenu.map((sublink) => (
                            <ScrollToTopLink
                              key={sublink.name}
                              to={sublink.path}
                              className={cn(
                                "block px-5 py-3 transition-colors text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 border-l-3 border-transparent hover:border-l-3 hover:border-green-500",
                                isActivePath(sublink.path) &&
                                  "text-green-600 border-l-3 border-green-500 bg-gradient-to-r from-green-50 to-teal-50 font-medium"
                              )}
                              onClick={handleLinkClick}
                            >
                              {sublink.name}
                            </ScrollToTopLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <ScrollToTopLink
                      to={link.path}
                      className={cn(
                        "px-4 py-2.5 rounded-lg font-medium transition-all duration-300",
                        isActivePath(link.path)
                          ? "text-white bg-gradient-to-r from-green-600 to-teal-600 shadow-md"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50/80"
                      )}
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </ScrollToTopLink>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-6">
              {/* Inline Search Form */}
              <form
                onSubmit={handleSearch}
                className="relative flex items-center"
              >
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2.5 rounded-full border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 hover:border-gray-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                  />
                </div>
              </form>

              <ScrollToTopLink
                to="/contact"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-7 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]"
              >
                Get Started
              </ScrollToTopLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full bg-green-50 hover:bg-green-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-5 w-5 text-green-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-all duration-300 lg:hidden",
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        style={{
          paddingTop: showTopBar ? "40px" : "0px",
        }}
      >
        <nav className="h-full overflow-y-auto">
          <div className="pt-24 px-6 pb-8">
            {/* Mobile Search Form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for services, content, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 text-base"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(link.name)}
                        className={cn(
                          "flex items-center justify-between w-full py-3.5 px-5 rounded-xl font-medium transition-all duration-300 text-left",
                          activeSubmenu === link.name
                            ? "bg-green-50 text-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            activeSubmenu === link.name && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "mt-2 space-y-1 overflow-hidden transition-all duration-300 pl-4",
                          activeSubmenu === link.name
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        {/* Added All Projects link for mobile as well */}
                        {link.name === "Portfolio" && (
                          <ScrollToTopLink
                            to="/portfolio"
                            className={cn(
                              "flex items-center gap-2 py-3 px-6 rounded-xl transition-colors border-l-2",
                              isActivePath("/portfolio") &&
                                location.pathname === "/portfolio"
                                ? "text-green-600 bg-green-50 border-green-500"
                                : "text-gray-600 hover:text-green-600 hover:bg-green-50 border-transparent"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <Grid className="h-4 w-4" />
                            <span>All Projects</span>
                          </ScrollToTopLink>
                        )}

                        {link.submenu.map((sublink) => (
                          <ScrollToTopLink
                            key={sublink.name}
                            to={sublink.path}
                            className={cn(
                              "block py-3 px-6 rounded-xl transition-colors border-l-2",
                              isActivePath(sublink.path)
                                ? "text-green-600 bg-green-50 border-green-500"
                                : "text-gray-600 hover:text-green-600 hover:bg-green-50 border-transparent"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {sublink.name}
                          </ScrollToTopLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <ScrollToTopLink
                      to={link.path}
                      className={cn(
                        "block py-3.5 px-5 rounded-xl font-medium transition-colors",
                        isActivePath(link.path)
                          ? "text-white bg-gradient-to-r from-green-600 to-teal-600"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </ScrollToTopLink>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="mt-10 space-y-4">
              <ScrollToTopLink
                to="/contact"
                className="block w-full py-4 rounded-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium shadow-lg text-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </ScrollToTopLink>

              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://calendly.com/akshay-satpaise99/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-xs">Schedule</span>
                </a>

                <a
                  href="https://wa.me/918484819808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="text-xs">WhatsApp</span>
                </a>

                <a
                  href="tel:+918484819808"
                  className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-xs">Call</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
