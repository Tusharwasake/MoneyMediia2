import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Loader2,
  ArrowRight,
  Sparkles,
  Eye,
  Monitor,
  Clock,
  Calendar,
  Film,
  FileText,
  Image,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedPortfolioItems, PortfolioItem } from "@/api/portfolio.api";

const PortfolioPreview = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
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

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch 3 featured portfolio items
        const response = await getFeaturedPortfolioItems(3);

        if (
          response.data.status === "success" &&
          response.data.data.portfolioItems?.length
        ) {
          setPortfolioItems(response.data.data.portfolioItems);
        } else {
          throw new Error("No portfolio items found.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching portfolio items:", err);
          setError(err.message || "Failed to load portfolio items.");
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  // Get icon based on item type
  const getItemTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Film className="h-4 w-4" />;
      case "case-study":
        return <FileText className="h-4 w-4" />;
      case "blog":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(date);
  };

  // Loading state with enhanced visualization
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Our Success Stories</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Explore our latest finance videos and content marketing
                projects.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-600">Loading our featured projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state with improved design
  if (error || portfolioItems.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Our Success Stories</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Explore our latest finance videos and content marketing
                projects.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 font-medium px-6 py-2.5 rounded-lg transition-all"
                >
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100 max-w-3xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-yellow-50 rounded-full flex items-center justify-center">
              <Eye className="h-10 w-10 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Portfolio Items Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              {error ||
                "We're currently updating our portfolio with new exciting projects. Please check back soon to see our latest work."}
            </p>
            {error && (
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-lg px-8 py-3 rounded-xl font-medium transition-all"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refresh Portfolio
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Render portfolio items with enhanced design
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Our Success Stories</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
              Featured Work
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl">
              Explore our latest finance videos and content marketing projects
              that have helped our clients achieve remarkable results.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/portfolio"
              onClick={(e) => {
                if (window.location.pathname.includes("/portfolio")) {
                  e.preventDefault();
                  window.location.href = "/portfolio";
                }
              }}
            >
              <Button
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 font-medium px-6 py-2.5 rounded-lg group transition-all"
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          {portfolioItems.map((item, index) => (
            <div
              key={item._id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-in bg-white`}
              style={{
                animationDelay: `${index * 0.2}s`,
                boxShadow:
                  hoveredItem === item._id
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                    : "",
              }}
              onMouseEnter={() => setHoveredItem(item._id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback for image loading errors
                    e.currentTarget.src = "/api/placeholder/800/600";
                    e.currentTarget.onerror = null;
                  }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80"></div>

                {/* Type indicator */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md">
                  {getItemTypeIcon(item.type)}
                  {item.type}
                </div>

                {/* Timestamp if available */}
                {item.createdAt && (
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.createdAt)}
                  </div>
                )}

                {/* Play button for videos */}
                {item.type.toLowerCase() === "video" && item.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-green-600 to-teal-600 rounded-full p-5 text-white transition-all transform hover:scale-110 shadow-xl"
                    >
                      <Play className="h-8 w-8 fill-white" />
                    </a>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                    {item.category}
                  </span>

                  {item.duration && (
                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  Client: <span className="font-medium">{item.client}</span>
                </p>

                {/* Link based on content type */}
                <div className="flex-grow">
                  {item.type.toLowerCase() === "video" && item.videoUrl ? (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                    >
                      Watch video
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : item.type.toLowerCase() === "case-study" ? (
                    <Link
                      to={`/portfolio/${item._id}`}
                      className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                    >
                      Read case study
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : item.type.toLowerCase() === "blog" && item.blogUrl ? (
                    <a
                      href={item.blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                    >
                      Read blog post
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link
                      to={`/portfolio/${item._id}`}
                      className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                    >
                      View project details
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Looking for a specific type of financial content?
          </p>
          <Link
            to="/contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/contact";
            }}
          >
            <Button className="bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-lg px-8 py-3 rounded-xl font-medium transition-all">
              Discuss Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
    </section>
  );
};

export default PortfolioPreview;
