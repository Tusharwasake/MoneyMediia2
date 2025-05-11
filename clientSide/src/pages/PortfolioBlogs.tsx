import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getBlogPosts } from "@/api/portfolio.api"; // Import the API function
import { PortfolioItem } from "@/api/portfolio.api"; // Import the PortfolioItem interface

const PortfolioBlogs = () => {
  const [blogs, setBlogs] = useState<PortfolioItem[]>([]); // State for blogs
  const [industryFilter, setIndustryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getBlogPosts(); // Fetch blogs from the API
        setBlogs(response.data.data.blogPosts || []); // Set the blogs in state
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on selected filters
  const filteredBlogs = blogs.filter(
    (blog) =>
      (industryFilter === "all" ||
        blog.industry?.toLowerCase() === industryFilter.toLowerCase()) &&
      (categoryFilter === "all" ||
        blog.category?.toLowerCase() === categoryFilter.toLowerCase()) &&
      (searchQuery === "" ||
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Extract unique categories
  const categories = Array.from(new Set(blogs.map((blog) => blog.category)));

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-money-teal hover:text-money-green bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Financial Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, education, and thought leadership on financial topics
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={industryFilter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setIndustryFilter("all")}
                >
                  All Industries
                </Badge>
                <Badge
                  variant={
                    industryFilter === "brokerage" ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setIndustryFilter("brokerage")}
                >
                  Brokerage
                </Badge>
                <Badge
                  variant={
                    industryFilter === "mutual fund" ? "default" : "outline"
                  }
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
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={categoryFilter === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCategoryFilter("all")}
              >
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    categoryFilter === category.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setCategoryFilter(category.toLowerCase())}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredBlogs.map((blog) => (
            <a
              key={blog._id || blog.id}
              href={blog.blogUrl} // Navigate to the blog URL
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security for external links
              className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all h-full flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <Badge>{blog.category}</Badge>
                  <span className="text-sm text-gray-500">
                    {blog.readTime} min read
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-money-green transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">{blog.excerpt}</p>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4">{blog.description}</p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By {blog.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(
                      blog.publishDate || blog.date || ""
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">
              No articles match your search
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setIndustryFilter("all");
                setCategoryFilter("all");
                setSearchQuery("");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PortfolioBlogs;
