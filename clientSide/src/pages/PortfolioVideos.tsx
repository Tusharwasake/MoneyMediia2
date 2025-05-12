import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Play,
  ArrowLeft,
  Filter,
  Clock,
  Building,
  Tag,
  Search,
  Film,
  X,
  Sparkles,
  Eye,
  RefreshCw,
  Loader2,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getVideos } from "@/api/portfolio.api"; // Import the API function
import { PortfolioItem } from "@/api/portfolio.api"; // Import the PortfolioItem interface

const PortfolioVideos = () => {
  const [videos, setVideos] = useState<PortfolioItem[]>([]); // State for videos
  const [industryFilter, setIndustryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch videos from the API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getVideos(); // Fetch videos from the API
        setVideos(response.data.data.videos || []); // Set the videos in state
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setIndustryFilter("all");
    setTypeFilter("all");
    setSearchQuery("");
  };

  // Get unique industries from videos
  const industries = [
    "all",
    ...new Set(videos.map((video) => video.industry).filter(Boolean)),
  ];

  // Get unique types from videos
  const types = [
    "all",
    ...new Set(videos.map((video) => video.type).filter(Boolean)),
  ];

  // Filter videos based on selected filters and search query
  const filteredVideos = videos.filter(
    (video) =>
      (industryFilter === "all" ||
        video.industry?.toLowerCase() === industryFilter.toLowerCase()) &&
      (typeFilter === "all" ||
        video.type?.toLowerCase() === typeFilter.toLowerCase()) &&
      (searchQuery === "" ||
        video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.client?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Loading state with improved design
  if (isLoading) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-medium text-gray-700 mb-2">
                  Loading video portfolio
                </h2>
                <p className="text-gray-500">
                  Please wait while we prepare our premium financial videos
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
                Unable to Load Videos
              </h2>
              <p className="text-gray-600 mb-8">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Retry Loading Videos
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
          {/* Improved Go Back Button */}
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-10 transition-all duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>

          <div className="text-center mb-12 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
              <Film className="h-4 w-4" />
              <span className="text-sm font-medium">Video Gallery</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
              Financial Video Portfolio
            </h1>

            <p className="text-xl text-gray-600 mx-auto">
              Explore our collection of premium financial videos created for
              leading clients across different industries.
            </p>
          </div>

          {/* Search and filter section */}
          <div className="mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
                {/* Search bar */}
                <div className="relative flex-grow">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-5 w-5 animate-pulse" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search videos by title, description or client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Filter toggle button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow"
                >
                  <Filter className="h-5 w-5" />
                  <span className="font-medium">Filters</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Applied filters count */}
                {(industryFilter !== "all" ||
                  typeFilter !== "all" ||
                  searchQuery) && (
                  <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 text-green-700 rounded-xl flex items-center gap-2 border border-green-100 shadow-sm">
                    <Badge className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
                      {[
                        industryFilter !== "all" ? 1 : 0,
                        typeFilter !== "all" ? 1 : 0,
                        searchQuery ? 1 : 0,
                      ].reduce((a, b) => a + b, 0)}{" "}
                      active
                    </Badge>
                    <button
                      onClick={clearFilters}
                      className="text-green-700 hover:text-green-900 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* Expandable filters with animation */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-700">
                      <Building className="h-4 w-4 text-gray-500" />
                      Filter by Industry
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {industries.map((industry) => (
                        <Badge
                          key={industry}
                          variant={
                            industryFilter === industry ? "default" : "outline"
                          }
                          className={`cursor-pointer px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            industryFilter === industry
                              ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-md"
                              : "hover:bg-gray-100 border-gray-300"
                          }`}
                          onClick={() => setIndustryFilter(industry)}
                        >
                          {industry === "all" ? "All Industries" : industry}
                          {industryFilter === industry && (
                            <X className="h-3 w-3 ml-1 inline-block" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-700">
                      <Tag className="h-4 w-4 text-gray-500" />
                      Filter by Type
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {types.map((type) => (
                        <Badge
                          key={type}
                          variant={typeFilter === type ? "default" : "outline"}
                          className={`cursor-pointer px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            typeFilter === type
                              ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-md"
                              : "hover:bg-gray-100 border-gray-300"
                          }`}
                          onClick={() => setTypeFilter(type)}
                        >
                          {type === "all" ? "All Types" : type}
                          {typeFilter === type && (
                            <X className="h-3 w-3 ml-1 inline-block" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset filters
                  </button>
                </div>
              </div>
            </div>

            {/* Results count with enhanced design */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 mb-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-gray-700 mb-2 sm:mb-0">
                <p className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-gray-500" />
                  Showing{" "}
                  <span className="font-medium text-green-600">
                    {filteredVideos.length}
                  </span>{" "}
                  of <span className="font-medium">{videos.length}</span> videos
                </p>
              </div>

              {searchQuery && (
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-500" />
                    Results for:{" "}
                    <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                      {searchQuery}
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Video Grid with enhanced cards */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredVideos.map((video, index) => (
                <div
                  key={video._id || video.id}
                  className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-in border border-gray-100`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setActiveVideo(video._id || video.id)}
                  onMouseLeave={() => setActiveVideo(null)}
                >
                  {/* Video thumbnail with play overlay */}
                  <div className="aspect-video relative overflow-hidden group">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/800/600";
                        e.currentTarget.onerror = null;
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80"></div>

                    {/* Duration badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-xs rounded-full flex items-center gap-1 shadow-md">
                      <Clock className="h-3 w-3" />
                      {video.duration || "3:45"}
                    </div>

                    {/* Industry badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-xs font-medium rounded-full shadow-md flex items-center gap-1">
                      <Building className="h-3 w-3 text-gray-600" />
                      {video.industry || "Fintech"}
                    </div>

                    {/* Type badge - below industry */}
                    <div className="absolute top-12 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-medium rounded-full shadow-md flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {video.type || "Explainer"}
                    </div>

                    {/* Play button overlay with ripple effect */}
                    <a
                      href={video.videoUrl}
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

                    {/* Client tag on the bottom edge */}
                    {video.client && (
                      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 text-xs rounded-full shadow-md">
                        {video.client}
                      </div>
                    )}
                  </div>

                  {/* Video information */}
                  <div className="p-6 relative">
                    {/* Popular tag if applicable */}
                    {index < 3 && (
                      <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </div>
                    )}

                    {/* Title with line animation */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors relative pb-3">
                      {video.title}
                      <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500 group-hover:w-full"></span>
                    </h3>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {video.description ||
                        "This video explains financial concepts in a clear, engaging way that resonates with the target audience."}
                    </p>

                    <div className="flex items-center justify-between">
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium text-sm transition-colors"
                      >
                        <Play className="h-4 w-4 fill-green-700" />
                        Watch Video
                      </a>

                      {/* Stats display */}
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Eye className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 10000)}+ views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center max-w-2xl mx-auto border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No videos match your criteria
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your filters or search terms to find what you're
                looking for.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Clear All Filters
              </button>
            </div>
          )}

          {/* Call to action */}
          {filteredVideos.length > 0 && (
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden mb-16">
              {/* Abstract shapes in background */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-8 border-white"></div>
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full border-4 border-white"></div>
                <div className="absolute top-1/2 left-1/3 h-24 w-24 rounded-full border-2 border-white"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center">
                <Film className="h-10 w-10 text-white" />
              </div>

              <div className="absolute -bottom-6 left-1/4 transform rotate-12 bg-white/10 backdrop-blur-sm rounded-xl w-32 h-12 flex items-center justify-center">
                <div className="text-white text-sm font-bold">
                  Premium Quality
                </div>
              </div>

              <div className="relative z-10 md:flex items-center justify-between">
                <div className="md:max-w-xl mb-8 md:mb-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4 shadow-lg">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Custom Video Production
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-md">
                    Want to create a similar video for your financial brand?
                  </h3>

                  <div className="space-y-4 md:pr-6">
                    <p className="text-white/90">
                      Our video production team can help you create engaging and
                      effective videos tailored to your specific financial
                      needs.
                    </p>

                    {/* Benefit list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-white/90 text-sm">
                          End-to-end production
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-white/90 text-sm">
                          Financial expertise
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-white/90 text-sm">
                          Industry-compliant
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-white/90 text-sm">
                          Proven ROI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 md:w-96">
                  <h4 className="text-lg font-bold mb-4">Get Started Today</h4>
                  <div className="space-y-4">
                    <Link
                      to="/contact"
                      className="bg-white text-green-700 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 hover:bg-gray-50"
                    >
                      <span>Discuss Your Project</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Link>

                    <a
                      href="https://calendly.com/akshay-satpaise99/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl border-2 border-white transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Schedule a Consultation</span>
                    </a>

                    <a
                      href="https://wa.me/918484819808"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-white/15 text-white py-3 px-6 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <div className="mt-4 text-center text-white/70 text-xs">
                    Most projects completed within 2-4 weeks
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default PortfolioVideos;
