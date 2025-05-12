import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Star,
  ChevronRight,
  Calendar,
  Filter,
  X,
  ThumbsUp,
  Clock,
  Tag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getAllServices } from "@/api/services.api";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Service {
  _id: string;
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageSrc?: string;
  category?: string;
  isPopular?: boolean;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [retryCount, setRetryCount] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const location = useLocation();

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isFetching = useRef(false); // Use useRef instead of a local variable

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Retry only when retryCount changes
  useEffect(() => {
    if (navigator.onLine && services.length === 0 && retryCount > 0) {
      fetchServices();
    }
  }, [retryCount]);

  // Scroll to specific service if requested
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location, services]);

  // Modified fetchServices function with retry logic
  const fetchServices = async () => {
    if (isFetching.current) return; // Prevent overlapping calls
    isFetching.current = true;

    try {
      setLoading(true);
      setError(null);

      const response = await getAllServices();
      if (response && response.data) {
        setServices(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch services", error);
      setError("Unable to load services. Please try again later.");
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  // Get unique categories from API data
  const categories = [
    { value: "all", label: "All Services" },
    ...Array.from(new Set(services.map((service) => service.category)))
      .filter(Boolean)
      .map((category) => ({
        value: category as string,
        label:
          (category as string).charAt(0).toUpperCase() +
          (category as string).slice(1),
      })),
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  // Custom color variables
  const moneyGreen = "#00A86B";
  const moneyTeal = "#008080";

  // Loading state with improved visual
  if (loading) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-medium text-gray-700 mb-2">
                  Loading our premium services
                </h2>
                <p className="text-gray-500">
                  Please wait while we prepare the best financial content
                  solutions for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div
          className={`container mx-auto px-4 py-16 transition-all duration-1000 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Hero Section with enhanced design */}
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">
                Premium Content Solutions
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
              Our Financial Services
            </h1>

            <p className="text-xl text-gray-600 mx-auto mb-10">
              Comprehensive financial content solutions designed to elevate your
              brand's communication strategy and connect with your audience more
              effectively
            </p>

            {/* Stats that build trust */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-12 mb-16">
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-bold text-3xl mb-1 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  98%
                </div>
                <p className="text-gray-600">Client satisfaction rate</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
                  <ThumbsUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-bold text-3xl mb-1 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  200+
                </div>
                <p className="text-gray-600">Clients served</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-bold text-3xl mb-1 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  48h
                </div>
                <p className="text-gray-600">Average turnaround time</p>
              </div>
            </div>

            {/* Search and Filter Section with improved design */}
            <div className="max-w-5xl mx-auto mb-12 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-6 w-full rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 text-lg font-medium placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full md:w-[240px] h-14 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100">
                      <div className="flex items-center">
                        <Filter className="h-5 w-5 mr-2 text-gray-500" />
                        <SelectValue placeholder="Filter by category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-gray-200">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="py-3 focus:bg-green-50 focus:text-green-700"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search results indicator */}
              {searchQuery && (
                <div className="mt-4 px-2 text-left">
                  <p className="text-gray-600">
                    Showing results for:{" "}
                    <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      {searchQuery}
                    </span>{" "}
                    <button
                      onClick={clearSearch}
                      className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
                    >
                      Clear search
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error handling with improved design */}
          {error && (
            <Alert
              variant="destructive"
              className="mb-12 max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-xl"
            >
              <AlertCircle className="h-5 w-5 text-red-500" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
              <Button
                onClick={() => setRetryCount((prev) => prev + 1)}
                variant="outline"
                className="ml-4 border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </Alert>
          )}

          {/* Category pills for easy filtering */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-green-600 text-white shadow-lg shadow-green-200"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                style={{
                  transform:
                    selectedCategory === category.value
                      ? "scale(1.05)"
                      : "scale(1)",
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Services Grid with enhanced design */}

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <div
                  key={service._id}
                  id={service.id}
                  className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-in`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    boxShadow:
                      hoveredCard === service.id
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                        : "",
                  }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    {service.imageSrc ? (
                      <img
                        src={service.imageSrc}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/800/600";
                          e.currentTarget.onerror = null;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          Image loading...
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>

                    {/* Category tag */}
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {service.category || "Service"}
                    </div>

                    {/* Popular badge */}
                    {service.isPopular && (
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                        <Star className="h-3 w-3 fill-white" />
                        Popular
                      </div>
                    )}

                    {/* Title overlay for better readability */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    {service.icon && (
                      <div className="text-4xl mb-4">{service.icon}</div>
                    )}

                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/services/${service.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/services/${service.id}`;
                        }}
                      >
                        <Button
                          variant="outline"
                          className="group/button hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                        >
                          View details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                        </Button>
                      </Link>

                      <a
                        href="https://calendly.com/akshay-satpaise99/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-medium flex items-center"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Schedule call</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {error
                  ? "Couldn't load services"
                  : searchQuery
                  ? `No services found matching "${searchQuery}"`
                  : "No services available"}
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {error
                  ? "We're having trouble loading the services. Please try again."
                  : searchQuery
                  ? "Try adjusting your search terms or browse all services."
                  : "Check back later for our available services."}
              </p>
              {!error && searchQuery && (
                <Button
                  onClick={clearSearch}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  View All Services
                </Button>
              )}
              {!error && !searchQuery && services.length === 0 && (
                <Button
                  onClick={() => setRetryCount((prev) => prev + 1)}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry Loading Services
                </Button>
              )}
            </div>
          )}

          {/* Enhanced Call to Action Section */}
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 relative overflow-hidden">
              {/* Abstract shapes in background */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-8 border-white"></div>
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full border-4 border-white"></div>
              </div>

              <div className="relative z-10 text-center md:text-left md:flex items-center justify-between">
                <div className="md:max-w-xl mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Ready to Transform Your Financial Content?
                  </h2>
                  <p className="text-white/90 text-lg md:pr-10">
                    Connect with our team to discuss your specific requirements
                    and discover how we can help you achieve your communication
                    goals.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/akshay-satpaise99/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-green-600 hover:bg-gray-50 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-5 w-5" />
                    Schedule Consultation
                  </a>

                  <Link
                    to="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/contact";
                    }}
                    className="bg-transparent text-white hover:bg-white/10 font-bold py-4 px-6 rounded-xl border-2 border-white transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    Get Custom Quote
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        .animate-in {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
};

export default Services;
