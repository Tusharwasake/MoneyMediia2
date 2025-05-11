import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Play, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getVideos } from "@/api/portfolio.api"; // Import the API function
import { PortfolioItem } from "@/api/portfolio.api"; // Import the PortfolioItem interface

const PortfolioVideos = () => {
  const [videos, setVideos] = useState<PortfolioItem[]>([]); // State for videos
  const [industryFilter, setIndustryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Filter videos based on selected filters
  const filteredVideos = videos.filter(
    (video) =>
      (industryFilter === "all" ||
        video.industry?.toLowerCase() === industryFilter.toLowerCase()) &&
      (typeFilter === "all" ||
        video.type?.toLowerCase() === typeFilter.toLowerCase())
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-money-green text-white px-4 py-2 rounded-lg shadow hover:bg-money-green/90 transition-all"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Improved Go Back Button */}
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-money-teal hover:text-money-green bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of financial videos created for clients across different industries.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-bold mb-4">Filter Videos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">By Industry</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={industryFilter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setIndustryFilter("all")}
                >
                  All Industries
                </Badge>
                <Badge
                  variant={industryFilter === "brokerage" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setIndustryFilter("brokerage")}
                >
                  Brokerage
                </Badge>
                <Badge
                  variant={industryFilter === "mutual fund" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setIndustryFilter("mutual fund")}
                >
                  Mutual Fund
                </Badge>
                <Badge
                  variant={industryFilter === "fintech" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setIndustryFilter("fintech")}
                >
                  Fintech
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">By Type</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={typeFilter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTypeFilter("all")}
                >
                  All Types
                </Badge>
                <Badge
                  variant={typeFilter === "educational" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTypeFilter("educational")}
                >
                  Educational
                </Badge>
                <Badge
                  variant={typeFilter === "explainer" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTypeFilter("explainer")}
                >
                  Explainer
                </Badge>
                <Badge
                  variant={typeFilter === "promotional" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTypeFilter("promotional")}
                >
                  Promotional
                </Badge>
                <Badge
                  variant={typeFilter === "demo" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTypeFilter("demo")}
                >
                  Demo
                </Badge>
                <Badge
                  variant={typeFilter === "corporate" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTypeFilter("corporate")}
                >
                  Corporate
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredVideos.map((video) => (
            <a
              key={video._id || video.id}
              href={video.videoUrl} // Navigate to the video URL
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security for external links
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all h-full"
            >
              <div className="aspect-video relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                <span className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </span>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-money-green/90 hover:bg-money-green rounded-full p-4 text-white transition-all transform hover:scale-110">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline">{video.industry}</Badge>
                  <Badge variant="outline">{video.type}</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                <p className="text-sm text-gray-500">Client: {video.client}</p>
              </div>
            </a>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">No videos match your filters</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filter criteria</p>
            <button
              onClick={() => {
                setIndustryFilter("all");
                setTypeFilter("all");
              }}
              className="bg-money-green text-white px-4 py-2 rounded-lg shadow hover:bg-money-green/90 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PortfolioVideos;
