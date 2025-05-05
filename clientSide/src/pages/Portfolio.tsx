
import { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Play } from "lucide-react";

// Sample portfolio data
const portfolioItems = [
  {
    id: 1,
    type: "video",
    title: "Investment Strategy Explainer",
    category: "Educational",
    client: "Global Investment Corp",
    thumbnail: "https://placehold.it/600x400?text=Investment+Strategy",
    videoUrl: "#",
    industry: "Brokerage",
  },
  {
    id: 2,
    type: "video",
    title: "Retirement Planning Guide",
    category: "Explainer",
    client: "Secure Future Advisors",
    thumbnail: "https://placehold.it/600x400?text=Retirement+Planning",
    videoUrl: "#",
    industry: "Mutual Fund",
  },
  {
    id: 3,
    type: "video",
    title: "Digital Banking Features",
    category: "Promotional",
    client: "NextGen Bank",
    thumbnail: "https://placehold.it/600x400?text=Digital+Banking",
    videoUrl: "#",
    industry: "Fintech",
  },
  {
    id: 4,
    type: "blog",
    title: "5 Trends Reshaping Fintech in 2023",
    category: "Industry Insights",
    author: "Sarah Johnson",
    date: "2023-03-15",
    thumbnail: "https://placehold.it/600x400?text=Fintech+Trends",
    readTime: 5,
    industry: "Fintech",
  },
  {
    id: 5,
    type: "blog",
    title: "Understanding Mutual Fund Fees",
    category: "Educational",
    author: "Michael Chen",
    date: "2023-02-22",
    thumbnail: "https://placehold.it/600x400?text=Mutual+Fund+Fees",
    readTime: 7,
    industry: "Mutual Fund",
  },
  {
    id: 6,
    type: "video",
    title: "Trading Platform Demo",
    category: "Product Demo",
    client: "TradeX Solutions",
    thumbnail: "https://placehold.it/600x400?text=Trading+Platform",
    videoUrl: "#",
    industry: "Brokerage",
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredItems = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.industry.toLowerCase() === filter.toLowerCase());

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our extensive collection of financial content work, including videos, blogs, and more
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="mb-6">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="brokerage" onClick={() => setFilter("brokerage")}>Brokerage</TabsTrigger>
              <TabsTrigger value="mutual-fund" onClick={() => setFilter("mutual fund")}>Mutual Fund</TabsTrigger>
              <TabsTrigger value="fintech" onClick={() => setFilter("fintech")}>Fintech</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/portfolio/videos">
              <Button variant="outline">
                Videos
              </Button>
            </Link>
            <Link to="/portfolio/blogs">
              <Button variant="outline">
                Blogs
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="aspect-video relative">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-money-green/90 hover:bg-money-green rounded-full p-4 text-white transition-all transform hover:scale-110">
                      <Play className="h-8 w-8" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-money-green text-sm font-medium">
                  {item.type === "video" ? item.category : `${item.category} • ${item.readTime} min read`}
                </span>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                <p className="text-gray-200 text-sm mt-1">
                  {item.type === "video" ? `Client: ${item.client}` : `By: ${item.author} • ${new Date(item.date).toLocaleDateString()}`}
                </p>
              </div>
            </div>
          ))}
        </div>

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
