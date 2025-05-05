import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getAllServices } from "@/api/servicesAPI";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Service {
  _id: string;
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageSrc?: string;
  category?: string;
  isPopular?: boolean;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        console.log("API Response:", response); // Debug log

        // Get services data from API response
        const serviceData = response.data || response;

        if (!Array.isArray(serviceData)) {
          throw new Error("Invalid data format from API");
        }

        // Use services exactly as returned from API
        setServices(serviceData);
      } catch (error) {
        console.error("Failed to fetch services", error);
        setError("Unable to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Scroll to specific service if requested
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location, services]);

  // Get unique categories from API data
  const categories = [
    { value: "all", label: "All Services" },
    ...Array.from(new Set(services.map((service1) => service1.category)))
      .filter(Boolean)
      .map((category1) => ({
        value: category1 as string,
        label: category1 as string,
      })),
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log(filteredServices, "tushae");
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-money-green animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading our services...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Premium Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive financial content solutions designed to elevate your
            brand's communication strategy
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-money-green"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[200px] h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {searchQuery && (
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                Showing results for:{" "}
                <span className="font-medium text-money-green">
                  "{searchQuery}"
                </span>
              </p>
            </div>
          )}
        </div>
        {error && (
          <Alert variant="destructive" className="mb-12 max-w-4xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                id={service.id}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement?.classList.add(
                        "bg-gray-200"
                      );
                    }}
                  />
                  {service.isPopular && (
                    <div className="absolute top-4 right-4 bg-money-green text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {service.icon && (
                    <div
                      className="text-money-green mb-4"
                      dangerouslySetInnerHTML={{ __html: service.icon }}
                    />
                  )}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-money-green transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {service.description}
                  </p>
                  <Link to={`/services/${service.id}`}>
                    <Button
                      variant="outline"
                      className="group/button w-full hover:bg-money-green hover:text-white hover:border-money-green"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <p className="text-xl text-gray-600 mb-4">
              {error
                ? error
                : searchQuery
                ? `No services found matching "${searchQuery}"`
                : "No services available"}
            </p>
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery("")}
                className="btn-gradient"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
        {/* Call to Action Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Financial Content?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with our team to discuss your specific requirements and
            discover how we can help you achieve your communication goals.
          </p>
          <Link to="/contact">
            <Button className="btn-gradient px-8 py-4 text-lg">
              Get a Custom Quote
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
