import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { subscribeNewsletter } from "@/api/servicesAPI";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to navigate to specific service section
  const handleServiceNavigation = (sectionId: string) => {
    navigate("/services", { state: { scrollTo: sectionId } });
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  // Helper function to handle navigation with scroll to top
  const handleNavigation = (to: string) => {
    navigate(to);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-money rounded-md flex items-center justify-center">
                <img
                  src="https://framerusercontent.com/images/SBTOIM4J28uMUhlWm9rsn1qc.png"
                  alt="Money Mediia Logo"
                  className="w-6 h-6"
                />
              </div>
              <span className="font-display font-bold text-xl">
                Money Mediia
              </span>
            </div>
            <p className="text-gray-300">
              Specialists in finance content marketing and video production.
            </p>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-money-green" />
              <a
                href="mailto:akshay@moneymediia.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                akshay@moneymediia.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-money-green" />
              <a
                href="tel:+918484819808"
                className="text-gray-300 hover:text-white transition-colors"
              >
                +91 8484819808
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-money-green" />
              <a
                href="https://wa.me/918484819808"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white inline-flex items-center"
              >
                WhatsApp Chat
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-money-green" />
              <a
                href="https://moneymediia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                www.moneymediia.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-money-green" />
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

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/portfolio")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleServiceNavigation("script-writing")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Script Writing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceNavigation("video-production")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Video Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceNavigation("infographics")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Infographics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceNavigation("translations")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Translations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceNavigation("corporate-videos")}
                  className="text-gray-300 hover:text-white transition-colors text-left w-full"
                >
                  Corporate Videos
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter to receive the latest updates and
              insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                required
              />
              <Button
                type="submit"
                className="btn-gradient"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>
            </form>
            <p className="text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Money Mediia. All rights reserved.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-6">
              <a
                href="https://www.linkedin.com/company/money-mediia12/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/market_boys3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/918484819808"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end space-x-6 mt-4">
            <button
              onClick={() => handleNavigation("/privacy")}
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavigation("/terms")}
              className="text-gray-400 hover:text-white text-sm"
            >
              Terms of Service
            </button>
            <button
              onClick={() => handleNavigation("/sitemap")}
              className="text-gray-400 hover:text-white text-sm"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
