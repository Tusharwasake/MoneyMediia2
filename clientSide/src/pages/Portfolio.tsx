import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Play,
  Loader2,
  FileText,
  Filter,
  Sparkles,
  Tag,
  Building,
  Film,
  Clock,
  X,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react";
import { getAllPortfolioItems } from "@/api/portfolio.api";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch portfolio items on component mount
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllPortfolioItems();
        setPortfolioItems(response.data.data.portfolioItems);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        setError("Failed to load portfolio items. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  // Filter portfolio items based on the selected filter
  useEffect(() => {
    const filtered =
      filter === "brokerage"
        ? portfolioItems.filter(
            (item) => item.industry?.toLowerCase() === "brokerage"
          )
        : filter === "mutual fund"
        ? portfolioItems.filter(
            (item) => item.industry?.toLowerCase() === "mutual fund"
          )
        : filter === "fintech"
        ? portfolioItems.filter(
            (item) => item.industry?.toLowerCase() === "fintech"
          )
        : filter === "videos"
        ? portfolioItems.filter((item) => item.type?.toLowerCase() === "video")
        : filter === "blogs"
        ? portfolioItems.filter((item) => item.type?.toLowerCase() === "blog")
        : portfolioItems;

    setFilteredItems(filtered);
  }, [filter, portfolioItems]);

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recent";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recent";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Loading state with enhanced visualization
  if (isLoading) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-medium text-gray-700 mb-2">
                  Loading our portfolio
                </h2>
                <p className="text-gray-500">
                  Please wait while we showcase our best financial content work
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state with improved design
  if (error) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Unable to Load Portfolio Items
              </h2>
              <p className="text-gray-600 mb-8">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Retry Loading Portfolio
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden py-16">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div
          className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Header Section with enhanced design */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Our Work</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
              Financial Content Portfolio
            </h1>

            <p className="text-xl text-gray-600 mx-auto">
              Explore our extensive collection of premium financial content work
              across various industries, including videos, blogs, and more
              created for leading financial institutions.
            </p>
          </div>

          {/* Enhanced Filter and Navigation Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-10">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              {/* Industry Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  Filter by Industry
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "brokerage", "mutual fund", "fintech"].map(
                    (industry) => (
                      <button
                        key={industry}
                        onClick={() => setFilter(industry)}
                        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                          filter === industry
                            ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {industry.charAt(0).toUpperCase() + industry.slice(1)}
                        {filter === industry && filter !== "all" && (
                          <X className="h-3 w-3 ml-1 inline-block" />
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Right-Aligned Categories */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  Content Types
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/portfolio/videos"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all shadow-sm hover:shadow border border-gray-200 hover:border-green-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Film className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">Videos</span>
                      <span className="text-xs text-gray-500 block">
                        View all
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
                  </Link>

                  <Link
                    to="/portfolio/blogs"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all shadow-sm hover:shadow border border-gray-200 hover:border-green-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">Blogs</span>
                      <span className="text-xs text-gray-500 block">
                        View all
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Results count with enhanced design */}
          <div className="flex justify-between items-center px-2 mb-6">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-gray-700">
              <p className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                {filter !== "all" ? (
                  <>
                    Showing{" "}
                    <span className="font-medium text-green-600">
                      {filteredItems.length}
                    </span>{" "}
                    items in <span className="font-medium">{filter}</span>
                    <button
                      onClick={() => setFilter("all")}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-medium">{filteredItems.length}</span>{" "}
                    portfolio items
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Portfolio Items Grid with enhanced cards and FIXED CLIENT/AUTHOR DISPLAY */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-in border border-gray-100`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Portfolio item thumbnail */}
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/800/600";
                        e.currentTarget.onerror = null;
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80"></div>

                    {/* Type badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-xs font-medium rounded-full shadow-md flex items-center gap-1">
                      {item.type === "video" ? (
                        <>
                          <Film className="h-3 w-3 text-gray-600" />
                          Video
                        </>
                      ) : (
                        <>
                          <FileText className="h-3 w-3 text-gray-600" />
                          Blog
                        </>
                      )}
                    </div>

                    {/* Industry badge - if available */}
                    {item.industry && (
                      <div className="absolute top-12 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-medium rounded-full shadow-md flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {item.industry}
                      </div>
                    )}

                    {/* Duration/Read time */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-xs rounded-full flex items-center gap-1 shadow-md">
                      <Clock className="h-3 w-3" />
                      {item.type === "video"
                        ? item.duration || "3:45"
                        : `${item.readTime || "5"} min read`}
                    </div>

                    {/* FIXED: Client/Author badge with better visibility */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 text-xs rounded-lg shadow-md max-w-[80%] truncate flex items-center gap-1.5">
                      <User className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">
                        {item.type === "video"
                          ? item.client
                            ? `Client: ${item.client}`
                            : "Client Project"
                          : item.author
                          ? `By: ${item.author}`
                          : "Expert Article"}
                      </span>
                    </div>

                    {/* Play button for videos */}
                    {item.type === "video" && (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                      >
                        <div className="relative transform transition-all duration-500 group-hover:scale-110">
                          {/* Ripple animations */}
                          <div className="absolute inset-0 rounded-full animate-ping bg-white/10 duration-1000"></div>
                          <div className="absolute -inset-2 rounded-full animate-pulse bg-white/20 duration-2000"></div>

                          {/* Play button */}
                          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-full p-5 text-white relative shadow-xl border border-white/30 backdrop-blur-sm z-10">
                            <Play className="h-8 w-8 fill-white" />
                          </div>
                        </div>
                      </a>
                    )}
                  </div>

                  {/* Portfolio item content */}
                  <div className="p-6">
                    {/* Title with line animation */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-700 transition-colors relative pb-3 line-clamp-2">
                      {item.title}
                      <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500 group-hover:w-full"></span>
                    </h3>

                    {/* Category/Description */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {item.category ||
                        item.description ||
                        "Financial content project showcasing expertise in the industry."}
                    </p>

                    {/* Action links */}
                    <div className="flex items-center justify-between">
                      {item.type === "video" ? (
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium text-sm transition-colors"
                        >
                          <Play className="h-4 w-4 fill-green-700" />
                          Watch Video
                        </a>
                      ) : (
                        <a
                          href={item.blogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium text-sm transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          Read Article
                        </a>
                      )}

                      {/* Date display */}
                      <div className="text-gray-500 text-sm flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(
                          item.date || item.publishDate || item.createdAt
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center max-w-2xl mx-auto border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Filter className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No portfolio items found
              </h3>
              <p className="text-gray-600 mb-8">
                No items match the selected filter criteria.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                View All Projects
              </button>
            </div>
          )}

          {/* Enhanced Call-to-Action Section */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden mb-16">
            {/* Abstract shapes in background */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-8 border-white"></div>
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full border-4 border-white"></div>
              <div className="absolute top-1/2 left-1/3 h-24 w-24 rounded-full border-2 border-white"></div>
            </div>

            <div className="relative z-10 md:flex items-center justify-between">
              <div className="md:max-w-xl mb-8 md:mb-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4 shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Looking for Something Specific?
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-md">
                  Let's Create Your Next Financial Content Project
                </h3>

                <p className="text-white/90 md:pr-6 mb-6">
                  Our team specializes in creating engaging, informative
                  financial content tailored to your specific needs and
                  audience.
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  to="/contact"
                  className="bg-white text-green-700 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 hover:bg-gray-50 block"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <a
                  href="https://wa.me/918484819808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl border-2 border-white transition-all text-center flex items-center justify-center gap-2 block"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </a>
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

export default Portfolio;
