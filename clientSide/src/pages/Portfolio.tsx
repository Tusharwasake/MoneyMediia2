import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Play, Loader2 } from "lucide-react";
import { getAllPortfolioItems } from "@/api/portfolio.api";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            (item) => item.industry.toLowerCase() === "brokerage"
          )
        : filter === "mutual fund"
        ? portfolioItems.filter(
            (item) => item.industry.toLowerCase() === "mutual fund"
          )
        : filter === "fintech"
        ? portfolioItems.filter(
            (item) => item.industry.toLowerCase() === "fintech"
          )
        : filter === "videos"
        ? portfolioItems.filter((item) => item.type.toLowerCase() === "video")
        : filter === "blogs"
        ? portfolioItems.filter((item) => item.type.toLowerCase() === "blog")
        : portfolioItems;

    setFilteredItems(filtered);
  }, [filter, portfolioItems]);

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-money-green mx-auto" />
          <p className="text-gray-600 mt-4">Loading portfolio items...</p>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-red-600 text-xl">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-money-green text-white"
          >
            Retry
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our extensive collection of financial content work,
            including videos, blogs, and more.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="flex space-x-4">
              {["all", "brokerage", "mutual fund", "fintech"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === tab
                      ? "bg-money-green text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Right-Aligned Links for Videos and Blogs */}
          <div className="flex space-x-4 mt-4 md:mt-0 md:ml-auto">
            <Link
              to="/portfolio/videos"
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all flex items-center"
            >
              <Play className="inline-block mr-2 h-4 w-4" />
              Videos
            </Link>
            <Link
              to="/portfolio/blogs"
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all flex items-center"
            >
              <ArrowRight className="inline-block mr-2 h-4 w-4" />
              Blogs
            </Link>
          </div>
        </div>

        {/* Portfolio Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <a
                key={item.id}
                href={item.type === "video" ? item.videoUrl : item.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all block"
              >
                <div className="aspect-video relative">
                  {/* Tag for the type */}
                  <div className="absolute top-2 left-2 bg-money-green text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {item.type}
                  </div>

                  {/* Thumbnail */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://dummyimage.com/640x360/f3f4f6/94a3b8&text=Image+Unavailable";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>

                  {/* Play Button for Videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-money-green/90 hover:bg-money-green rounded-full p-4 text-white transition-all transform hover:scale-110">
                        <Play className="h-8 w-8" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-money-green text-sm font-medium">
                    {item.type === "video"
                      ? item.category
                      : `${item.category} • ${item.readTime} min read`}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-gray-200 text-sm mt-1">
                    {item.type === "video"
                      ? `Client: ${item.client}`
                      : `By: ${item.author} • ${new Date(
                          item.date
                        ).toLocaleDateString()}`}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No portfolio items found for the selected filter.
            </p>
          )}
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center mt-12">
          <p className="text-xl mb-4">Looking for more specific content?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/portfolio/videos">
              <Button className="w-full sm:w-auto">
                Browse All Videos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/portfolio/blogs">
              <Button variant="outline" className="w-full sm:w-auto">
                Read Our Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
