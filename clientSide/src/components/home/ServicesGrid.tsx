const services2 = [
  {
    id: "script-writing",
    title: "Script Writing",
    description: "Compelling scripts that simplify complex financial topics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: "infographics",
    title: "Infographics",
    description:
      "Visual data storytelling that simplifies financial information",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
  },
  {
    id: "video-production",
    title: "Video Production",
    description: "High-quality videos that engage and educate your audience",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "translations",
    title: "Translations",
    description: "Professional translations for global financial communication",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    ),
  },
  {
    id: "shooting",
    title: "Shooting",
    description: "Professional video shoots for financial institutions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "brand-shoots",
    title: "Brand Shoots",
    description: "Strategic brand photography for financial marketing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "podcasts",
    title: "Podcasts",
    description: "Engaging audio content for financial thought leadership",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    ),
  },
  {
    id: "corporate-videos",
    title: "Corporate Videos",
    description: "Professional corporate videos for financial companies",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
];

import { useEffect, useState } from "react";
import {
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Star,
  Layout,
  Sparkles,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getAllServices } from "@/api/servicesAPI";

interface Service {
  _id: string;
  id: string;
  title: string;
  description: string;
  icon?: string;
  category?: string;
  isPopular?: boolean;
}

const ServicesGrid = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllServices();
        // Merge API data with icons from services2
        const servicesWithIcons = response.data.map((service: Service) => {
          const serviceWithIcon = services2.find((s) => s.id === service.id);
          return {
            ...service,
            icon: serviceWithIcon?.icon || services2[0].icon,
            category: getCategoryForService(service.id),
            isPopular: [
              "video-production",
              "script-writing",
              "infographics",
            ].includes(service.id),
          };
        });
        setServices(servicesWithIcons);
      } catch (error) {
        console.error("Failed to fetch services", error);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle scroll to specific service
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        const timeout = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [location, services]);

  const getCategoryForService = (serviceId: string) => {
    if (["script-writing", "translations"].includes(serviceId))
      return "content";
    if (
      [
        "video-production",
        "corporate-videos",
        "podcasts",
        "shooting",
        "brand-shoots",
      ].includes(serviceId)
    )
      return "visual";
    if (["infographics"].includes(serviceId)) return "design";
    return "other";
  };

  const categories = ["all", "content", "visual", "design"];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  const getServiceIcon = (serviceId: string) => {
    const service = services2.find((s) => s.id === serviceId);
    return service?.icon || <DefaultIcon />;
  };

  if (loading) {
    return (
      <section className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-money-green animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading our premium services...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container-custom">
          <Alert
            variant="destructive"
            className="max-w-2xl mx-auto border-l-4 border-red-500"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-medium">{error}</AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section bg-gradient-to-b from-gray-50 to-white"
      id="services"
    >
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-money-green/10 text-money-green px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Comprehensive Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Expert Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your financial content strategy with our suite of
            professional services. From concept to completion, we deliver
            exceptional results.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-money-green text-white shadow-lg shadow-money-green/25"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredServices?.map((service) => (
            <Card
              key={service._id}
              id={service.id}
              className={`group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                service.isPopular
                  ? "ring-2 ring-money-green"
                  : "border border-gray-200"
              }`}
            >
              {service.isPopular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-money-green text-white flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="mb-4 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-money-green/10 to-money-teal/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-money-green group-hover:text-money-green/80 transition-colors">
                      {getServiceIcon(service.id)}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-money-green transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription className="mb-6 text-gray-600 line-clamp-2">
                  {service.description}
                </CardDescription>
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium group-hover:bg-money-green group-hover:text-white transition-all duration-300 w-full justify-center"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && !error && (
          <div className="text-center py-12">
            <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No services found in this category
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 text-money-green hover:text-money-green/80 font-medium"
            >
              View all services
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Looking for a custom solution?</p>
          <Link to="/contact">
            <button className="btn-gradient px-12 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Get Custom Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

export default ServicesGrid;
