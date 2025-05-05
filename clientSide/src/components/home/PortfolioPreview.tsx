
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const portfolioItems = [
  {
    id: 1,
    type: "video",
    title: "Investment Strategy Explainer",
    category: "Educational",
    client: "Global Investment Corp",
    thumbnail: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1470&auto=format&fit=crop",
    videoUrl: "#"
  },
  {
    id: 2,
    type: "video",
    title: "Retirement Planning Guide",
    category: "Explainer",
    client: "Secure Future Advisors",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    videoUrl: "#"
  },
  {
    id: 3,
    type: "video",
    title: "Digital Banking Features",
    category: "Promotional",
    client: "NextGen Bank",
    thumbnail: "https://images.unsplash.com/photo-1616077168712-ed3bb0240068?q=80&w=1470&auto=format&fit=crop",
    videoUrl: "#"
  }
];

const PortfolioPreview = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Explore our latest finance videos and content marketing projects.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link to="/portfolio">
              <Button variant="outline" className="border-money-teal text-money-teal hover:bg-money-teal/10">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
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
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-money-green/90 hover:bg-money-green rounded-full p-4 text-white transition-all transform hover:scale-110">
                    <Play className="h-10 w-10" />
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-money-green text-sm font-medium">{item.category}</span>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                <p className="text-gray-200 text-sm mt-1">Client: {item.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
