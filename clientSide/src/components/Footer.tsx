import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  ArrowRight,
  Globe,
  MessageSquare,
  Instagram,
  Linkedin,
  MapPin,
  Check,
  Calendar,
  Star,
  ChevronRight,
  Shield,
  ExternalLink,
  Twitter,
  Facebook,
  Youtube,
  BriefcaseBusiness,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { subscribeNewsletter } from "@/api/newsletter";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const navigate = useNavigate();

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubscribed(true);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to navigate to specific service section
  const handleServiceNavigation = (sectionId: string) => {
    navigate(`/services#${sectionId}`);

    // Ensure we wait for navigation before trying to scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  // Helper function to handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    // Use navigate from React Router
    navigate(path);

    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400/20 to-teal-500/20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400/20 to-green-500/20 blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pattern-dots"></div>

      {/* Call to Action Bar */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Ready to Transform Your Financial Content?
                </h3>
                <p className="text-gray-300">
                  Schedule a free 30-minute consultation with our experts
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://calendly.com/akshay-satpaise99/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Consultation</span>
              </a>
              <Button
                onClick={() => handleNavigation("/contact")}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                <span>Contact Us</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`container mx-auto px-4 pt-16 pb-10 relative z-10 transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src="https://framerusercontent.com/images/SBTOIM4J28uMUhlWm9rsn1qc.png"
                  alt="Money Mediia Logo"
                  className="w-7 h-7"
                />
              </div>
              <span className="font-display font-bold text-2xl text-white">
                Money Mediia
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              We transform complex financial topics into engaging, accessible
              content that drives results. Specialists in finance content
              marketing and video production.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-xs text-white flex items-center gap-1.5">
                <Award className="h-3 w-3 text-yellow-400" />
                <span>SEBI Compliant</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-xs text-white flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-green-400" />
                <span>24h Response</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-xs text-white flex items-center gap-1.5">
                <Star className="h-3 w-3 text-yellow-400" />
                <span>5-Star Service</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Mail className="h-4 w-4 text-green-400" />
                </div>
                <a
                  href="mailto:akshay@moneymediia.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  akshay@moneymediia.com
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <a
                  href="tel:+918484819808"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 8484819808
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <MapPin className="h-4 w-4 text-green-400" />
                </div>
                <a
                  href="https://maps.app.goo.gl/noida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Noida, India
                </a>
              </div>
            </div>

            {/* WhatsApp support button */}
            <div className="pt-2">
              <a
                href="https://wa.me/918484819808"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/30 to-teal-600/30 hover:from-green-600/40 hover:to-teal-600/40 text-white px-5 py-3 rounded-lg transition-all group border border-green-500/30"
              >
                <MessageSquare className="h-4 w-4 text-green-400" />
                <span>Get Support on WhatsApp</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold font-display text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:from-green-400 after:to-teal-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "About Us", path: "/about" },
                { name: "Careers", path: "/careers" }, // Added Careers Link
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Button
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-300 hover:text-white transition-colors text-left w-full flex items-center group bg-transparent hover:bg-transparent p-0"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>{link.name}</span>
                    {link.name === "Careers" && (
                      <div className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold bg-green-600 text-white rounded-sm">
                        NEW
                      </div>
                    )}
                  </Button>
                </li>
              ))}
            </ul>

            {/* Social Media Icons */}
            <div className="pt-6">
              <p className="text-gray-400 text-sm mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/money-mediia12/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-gray-300 hover:text-white hover:scale-110 transform transition-transform"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/market_boys3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-gray-300 hover:text-white hover:scale-110 transform transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-gray-300 hover:text-white hover:scale-110 transform transition-transform"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-gray-300 hover:text-white hover:scale-110 transform transition-transform"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold font-display text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:from-green-400 after:to-teal-400">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Script Writing", id: "script-writing-001" },
                { name: "Video Production", id: "video-production-003" },
                { name: "Infographics", id: "infographics-002" },
                { name: "Translations", id: "translations-004" },
                { name: "Corporate Videos", id: "corporate-videos-008" },
              ].map((service) => (
                <li key={service.name}>
                  <Button
                    onClick={() => handleServiceNavigation(service.id)}
                    className="text-gray-300 hover:text-white transition-colors text-left w-full flex items-center group bg-transparent hover:bg-transparent p-0"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>{service.name}</span>
                  </Button>
                </li>
              ))}
            </ul>

            {/* View all services button */}
            <div className="pt-2">
              <Button
                onClick={() => handleNavigation("/services")}
                className="text-green-400 hover:text-green-300 transition-colors flex items-center group text-sm font-medium bg-transparent hover:bg-transparent p-0"
              >
                <span>View all services</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Careers highlight */}
            <div className="mt-8 bg-gradient-to-r from-green-900/30 to-teal-900/30 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <BriefcaseBusiness className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Join Our Team</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    We're looking for talented individuals passionate about
                    finance and content creation.
                  </p>
                  <Button
                    onClick={() => handleNavigation("/careers")}
                    className="text-green-400 hover:text-green-300 transition-colors text-sm flex items-center gap-1 group bg-transparent hover:bg-transparent p-0"
                  >
                    <span>View open positions</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold font-display text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:from-green-400 after:to-teal-400">
              Newsletter
            </h3>
            <p className="text-gray-300">
              Subscribe to receive expert insights on financial content
              strategies and industry updates.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-3 relative"
            >
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 pl-10 py-6 rounded-lg focus:border-green-500 focus:ring-green-500/20"
                    required
                    disabled={isSubmitting || isSubscribed}
                  />
                </div>
                <Button
                  type="submit"
                  className={`${
                    isSubscribed
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  } text-white px-4 py-2 rounded-lg transition-all duration-300 h-full`}
                  disabled={isSubmitting || isSubscribed}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isSubscribed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-400">
                By subscribing, you agree to our{" "}
                <Button
                  onClick={() => handleNavigation("/staticPage/PrivacyPolicy")}
                  className="text-green-400 hover:underline p-0 h-auto bg-transparent hover:bg-transparent"
                >
                  Privacy Policy
                </Button>
                .
              </p>

              {/* Success message */}
              {isSubscribed && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm rounded-lg transition-all duration-500">
                  <div className="text-white text-center p-4">
                    <Check className="h-6 w-6 mx-auto mb-2 text-white" />
                    <p className="font-medium">Thanks for subscribing!</p>
                  </div>
                </div>
              )}
            </form>

            {/* Compliance badge */}
            <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">
                    SEBI & RBI Compliant
                  </h4>
                  <p className="text-xs text-gray-300">
                    All our content is compliant with regulatory guidelines for
                    financial communication. We ensure accuracy and transparency
                    in all materials.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial snippet */}
            <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-300 italic">
                    "Money Mediia has transformed how we explain complex
                    financial products to our customers."
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    — Marketing Head, Leading Brokerage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social and copyright section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-1">
              <div className="text-gray-300 text-sm">
                © {currentYear} Money Mediia.
              </div>
              <div className="text-gray-500 text-sm">All rights reserved.</div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Button
                onClick={() => handleNavigation("/staticPage/PrivacyPolicy")}
                className="text-gray-400 hover:text-white text-sm transition-colors bg-transparent hover:bg-transparent p-0 h-auto"
              >
                Privacy Policy
              </Button>
              <Button
                onClick={() => handleNavigation("/staticPage/terms")}
                className="text-gray-400 hover:text-white text-sm transition-colors bg-transparent hover:bg-transparent p-0 h-auto"
              >
                Terms of Service
              </Button>
              <Button
                onClick={() => handleNavigation("/careers")}
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center bg-transparent hover:bg-transparent p-0 h-auto"
              >
                Careers
                <div className="ml-1.5 px-1 py-0.5 text-[10px] leading-none font-semibold bg-green-600 text-white rounded-sm">
                  NEW
                </div>
              </Button>
              <a
                href="https://moneymediia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                Website <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for patterns */}
      <style>{`
        .pattern-dots {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
