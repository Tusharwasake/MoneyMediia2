import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Changed from useNavigate to Link
import {
  ArrowRight,
  PlayCircle,
  MessageSquare,
  Star,
  CheckCircle,
  Calendar,
  Clock,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const CallToAction = () => {
  const [animateIn, setAnimateIn] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Modified approach - using window.location for navigation with scroll reset
  const handleNavigation = (to) => {
    // First try to use history API if available
    try {
      window.history.pushState({}, "", to);
      window.dispatchEvent(new Event("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      // Fallback to direct location change
      window.location.href = to;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 bg-gradient-to-br from-green-400/20 to-teal-500/20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 bg-gradient-to-tr from-teal-400/20 to-green-500/20 blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-grid"></div>

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Content Column - 7 columns on larger screens */}
          <div className="md:col-span-7">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white mb-6">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">
                  Premium Service Provider
                </span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-sm text-gray-300 ml-2">
                  Trusted by financial institutions
                </span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Ready to Elevate Your</span>
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent block">
                Financial Content?
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
              Transform complex financial topics into compelling videos and
              content that educates your audience and drives measurable results.
            </p>

            {/* Stats with enhanced design */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text mb-1">
                    50+
                  </div>
                  <div className="text-sm text-gray-400">
                    Projects Delivered
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text mb-1">
                    98%
                  </div>
                  <div className="text-sm text-gray-400">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text mb-1">
                    24h
                  </div>
                  <div className="text-sm text-gray-400">Average Response</div>
                </div>
              </div>
            </div>

            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/30 flex items-center justify-center mt-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Simplified complex financial topics
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/30 flex items-center justify-center mt-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Compliance-focused approach
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/30 flex items-center justify-center mt-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  End-to-end content production
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/30 flex items-center justify-center mt-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  ROI-driven content strategy
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Using Link component instead of button with onClick */}
              <Link
                to="/contact"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group flex items-center justify-center"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/portfolio"
                className="border-2 border-white/20 hover:border-white/40 bg-white/5 text-white px-8 py-4 text-lg rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 flex items-center justify-center"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  View Our Work
                </span>
              </Link>
            </div>

            {/* Contact options */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="https://calendly.com/akshay-satpaise99/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-green-400" />
                </div>
                <span>Schedule a consultation</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://wa.me/918484819808"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-green-400" />
                </div>
                <span>Chat on WhatsApp</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* View all services button */}
            <div className="mt-8">
              <Link
                to="/services"
                className="bg-transparent hover:bg-white/5 text-white/80 hover:text-white text-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-white/10 hover:border-white/20"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span>Explore all our services</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Visual Column - 5 columns on larger screens */}
          <div className="md:col-span-5 relative">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

            {/* Premium Card Design */}
            <div className="relative z-10 mt-6 md:mt-0 transform md:rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm">
                {/* Main Image with enhanced presentation */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1663100794696-6b7afa02016c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Financial content marketing visualization with charts and graphics"
                    className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/800/600";
                      e.currentTarget.onerror = null;
                    }}
                  />

                  {/* Video Play Overlay - Using Link instead of button with onClick */}
                  <Link
                    to="/portfolio"
                    className="absolute inset-0 flex items-center justify-center group"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 border border-white/30">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                  </Link>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Transform Your Financial Content
                  </h3>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <Link
                      to="/services/video-production-003"
                      className="bg-white/5 hover:bg-white/10 rounded-lg p-2 text-center transition-colors"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <p className="text-xs font-medium text-white">
                        Engaging Videos
                      </p>
                    </Link>
                    <Link
                      to="/services/script-writing-001"
                      className="bg-white/5 hover:bg-white/10 rounded-lg p-2 text-center transition-colors"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <p className="text-xs font-medium text-white">
                        Expert Writing
                      </p>
                    </Link>
                    <Link
                      to="/services/infographics-002"
                      className="bg-white/5 hover:bg-white/10 rounded-lg p-2 text-center transition-colors"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <p className="text-xs font-medium text-white">
                        Professional Design
                      </p>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        2-4 weeks delivery
                      </span>
                    </div>
                    <div className="text-xs font-medium text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text">
                      Premium Quality
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute bottom-10 -left-10 z-20 max-w-xs transform -rotate-6 hover:rotate-0 transition-all duration-500 hidden md:block">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Compliance Guaranteed
                    </div>
                    <div className="text-xs text-gray-400">
                      SEBI & RBI compliant content
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Satisfaction Badge */}
            <div className="absolute -bottom-5 right-5 z-20 hidden md:block">
              <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-lg rounded-full p-4 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="text-white font-bold text-sm">
                    100% Satisfaction
                  </div>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>

            {/* Service category buttons */}
            <div className="absolute -right-10 top-1/3 z-20 max-w-xs transform rotate-90 hidden lg:block">
              <div className="flex gap-4">
                <Link
                  to="/services"
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10 shadow-xl transition-colors"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <span className="text-xs font-medium text-white">
                    View All Services
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for patterns */}
      <style>{`
        .pattern-grid {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
