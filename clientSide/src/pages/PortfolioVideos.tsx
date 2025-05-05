
import { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample videos data
const videos = [
  {
    id: 1,
    title: "Investment Strategy Explainer",
    category: "Educational",
    client: "Global Investment Corp",
    thumbnail: "https://placehold.it/600x400?text=Investment+Strategy",
    videoUrl: "#",
    industry: "Brokerage",
    type: "Explainer",
    description: "A clear explanation of modern investment strategies for different risk profiles.",
    duration: "3:45"
  },
  {
    id: 2,
    title: "Retirement Planning Guide",
    category: "Explainer",
    client: "Secure Future Advisors",
    thumbnail: "https://placehold.it/600x400?text=Retirement+Planning",
    videoUrl: "#",
    industry: "Mutual Fund",
    type: "Educational",
    description: "Step-by-step guide to planning for retirement with mutual funds and other investments.",
    duration: "5:12"
  },
  {
    id: 3,
    title: "Digital Banking Features",
    category: "Promotional",
    client: "NextGen Bank",
    thumbnail: "https://placehold.it/600x400?text=Digital+Banking",
    videoUrl: "#",
    industry: "Fintech",
    type: "Promotional",
    description: "Showcase of cutting-edge digital banking features that enhance customer experience.",
    duration: "2:38"
  },
  {
    id: 6,
    title: "Trading Platform Demo",
    category: "Product Demo",
    client: "TradeX Solutions",
    thumbnail: "https://placehold.it/600x400?text=Trading+Platform",
    videoUrl: "#",
    industry: "Brokerage",
    type: "Demo",
    description: "Interactive demonstration of an advanced trading platform with real-time features.",
    duration: "4:20"
  },
  {
    id: 7,
    title: "Cryptocurrency Investment Risks",
    category: "Educational",
    client: "Blockchain Advisors",
    thumbnail: "https://placehold.it/600x400?text=Crypto+Risks",
    videoUrl: "#",
    industry: "Fintech",
    type: "Educational",
    description: "Analysis of risks and rewards in cryptocurrency investments for retail investors.",
    duration: "6:15"
  },
  {
    id: 8,
    title: "Annual Report Highlights",
    category: "Corporate",
    client: "Financial Services Inc.",
    thumbnail: "https://placehold.it/600x400?text=Annual+Report",
    videoUrl: "#",
    industry: "Mutual Fund",
    type: "Corporate",
    description: "Visual summary of key achievements and financial results for shareholders.",
    duration: "4:50"
  }
];

const PortfolioVideos = () => {
  const [industryFilter, setIndustryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const filteredVideos = videos.filter(video => 
    (industryFilter === "all" || video.industry.toLowerCase() === industryFilter.toLowerCase()) &&
    (typeFilter === "all" || video.type.toLowerCase() === typeFilter.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/portfolio" className="inline-flex items-center text-money-teal hover:text-money-green mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of financial videos created for clients across different industries
          </p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
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
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">No videos match your filters</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filter criteria</p>
            <Button onClick={() => { setIndustryFilter("all"); setTypeFilter("all"); }}>
              Clear All Filters
            </Button>
          </div>
        )}

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Need custom financial videos for your organization?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our team specializes in creating engaging, clear financial content that resonates with your audience.
          </p>
          <Link to="/contact">
            <Button className="btn-gradient px-8 py-3">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PortfolioVideos;
