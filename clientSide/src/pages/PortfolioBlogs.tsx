
import { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Sample blogs data
const blogs = [
  {
    id: 1,
    title: "5 Trends Reshaping Fintech in 2023",
    category: "Industry Insights",
    author: "Sarah Johnson",
    date: "2023-03-15",
    thumbnail: "https://placehold.it/600x400?text=Fintech+Trends",
    readTime: 5,
    industry: "Fintech",
    excerpt: "Explore the latest trends that are transforming the financial technology landscape this year and how they impact consumers and businesses.",
    content: "Lorem ipsum dolor sit amet..."
  },
  {
    id: 2,
    title: "Understanding Mutual Fund Fees",
    category: "Educational",
    author: "Michael Chen",
    date: "2023-02-22",
    thumbnail: "https://placehold.it/600x400?text=Mutual+Fund+Fees",
    readTime: 7,
    industry: "Mutual Fund",
    excerpt: "A comprehensive breakdown of mutual fund fee structures and what investors should watch for when making investment decisions.",
    content: "Lorem ipsum dolor sit amet..."
  },
  {
    id: 3,
    title: "How to Create Engaging Financial Videos",
    category: "Content Marketing",
    author: "David Williams",
    date: "2023-04-05",
    thumbnail: "https://placehold.it/600x400?text=Financial+Videos",
    readTime: 6,
    industry: "Brokerage",
    excerpt: "Best practices for creating financial videos that engage viewers while effectively communicating complex financial concepts.",
    content: "Lorem ipsum dolor sit amet..."
  },
  {
    id: 4,
    title: "The Role of AI in Financial Decision Making",
    category: "Technology",
    author: "Emma Rodriguez",
    date: "2023-01-18",
    thumbnail: "https://placehold.it/600x400?text=AI+Finance",
    readTime: 8,
    industry: "Fintech",
    excerpt: "How artificial intelligence is changing the way financial decisions are made and what it means for the future of the industry.",
    content: "Lorem ipsum dolor sit amet..."
  },
  {
    id: 5,
    title: "ESG Investing: Beyond the Buzzword",
    category: "Investment Strategies",
    author: "James Cooper",
    date: "2023-05-10",
    thumbnail: "https://placehold.it/600x400?text=ESG+Investing",
    readTime: 6,
    industry: "Mutual Fund",
    excerpt: "An in-depth look at environmental, social, and governance investing and how it's reshaping portfolio strategies worldwide.",
    content: "Lorem ipsum dolor sit amet..."
  },
  {
    id: 6,
    title: "Digital Transformation in Wealth Management",
    category: "Digital Strategy",
    author: "Lisa Tran",
    date: "2023-03-30",
    thumbnail: "https://placehold.it/600x400?text=Wealth+Management",
    readTime: 5,
    industry: "Brokerage",
    excerpt: "How technology is revolutionizing wealth management services and creating new opportunities for client engagement.",
    content: "Lorem ipsum dolor sit amet..."
  }
];

const PortfolioBlogs = () => {
  const [industryFilter, setIndustryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBlogs = blogs.filter(blog => 
    (industryFilter === "all" || blog.industry.toLowerCase() === industryFilter.toLowerCase()) &&
    (categoryFilter === "all" || blog.category.toLowerCase() === categoryFilter.toLowerCase()) &&
    (searchQuery === "" || blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Extract unique categories
  const categories = Array.from(new Set(blogs.map(blog => blog.category)));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/portfolio" className="inline-flex items-center text-money-teal hover:text-money-green mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, education, and thought leadership on financial topics
          </p>
        </div>

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
              {categories.map(category => (
                <Badge 
                  key={category}
                  variant={categoryFilter === category.toLowerCase() ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setCategoryFilter(category.toLowerCase())}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredBlogs.map((blog) => (
            <div 
              key={blog.id} 
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
                  <span className="text-sm text-gray-500">{blog.readTime} min read</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-money-green transition-colors">{blog.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{blog.excerpt}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">By {blog.author}</span>
                  <span className="text-sm text-gray-500">{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">No articles match your search</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={() => { setIndustryFilter("all"); setCategoryFilter("all"); setSearchQuery(""); }}>
              Clear All Filters
            </Button>
          </div>
        )}

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Need custom financial content for your organization?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our team can help you create compelling blog articles, white papers, and other written content for your financial brand.
          </p>
          <Link to="/contact">
            <Button className="btn-gradient px-8 py-3">
              Discuss Your Content Needs
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PortfolioBlogs;
