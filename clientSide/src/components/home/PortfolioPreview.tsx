import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedPortfolioItems } from "@/api/portfolio.api";

// Define the PortfolioItem interface
interface PortfolioItem {
  _id: string;
  type: string;
  title: string;
  category: string;
  client: string;
  thumbnail: string;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

const PortfolioPreview = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getFeaturedPortfolioItems(3); // Fetch 3 featured items
        // Log the response
        if (response.data.status === "success") {
          setPortfolioItems(response.data.data.portfolioItems);
        } else {
          throw new Error("Failed to fetch portfolio items");
        }
      } catch (err) {
        console.error("Error fetching portfolio items:", err);
        setError("Failed to load portfolio items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Explore our latest finance videos and content marketing
                projects.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-money-green" />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || portfolioItems.length === 0) {
    return (
      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
                  className="border-money-teal text-money-teal hover:bg-money-teal/10"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">
              {error ||
                "No portfolio items found. Check back later for updates."}
            </p>
            {error && (
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-money-green text-white"
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Explore our latest finance videos and content marketing projects.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link to="/portfolio">
              <Button
                variant="outline"
                className="border-money-teal text-money-teal hover:bg-money-teal/10"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="aspect-video relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback for image loading errors
                    e.currentTarget.src =
                      "https://via.placeholder.com/640x360/f3f4f6/94a3b8?text=Image+Unavailable";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>

                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/portfolio/${item._id}`}>
                      <button className="bg-money-green/90 hover:bg-money-green rounded-full p-4 text-white transition-all transform hover:scale-110">
                        <Play className="h-10 w-10" />
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-money-green text-sm font-medium">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                <p className="text-gray-200 text-sm mt-1">
                  Client: {item.client}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
