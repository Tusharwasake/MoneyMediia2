import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Star,
  ChevronRight,
  CalendarDays,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getServiceById } from "@/api/services.api";

interface Service {
  icon: string;
  title: string;
  fullDescription: string;
  benefits: string[];
  processSteps: string[];
  imageSrc: string;
}

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceId) {
        setError("Service ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch the service details using the API function
        const response = await getServiceById(serviceId);
        setService(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching the service details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  useEffect(() => {
    // Only scroll to top when the service ID changes, not on every navigation
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Colors
  const moneyGreen = "#00A86B";
  const moneyTeal = "#008080";

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-t-money-green border-gray-200 animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">
                Loading service details...
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-6">❌</div>
            <h1 className="text-3xl font-bold mb-6">Service Not Found</h1>
            <p className="mb-8 text-gray-600">
              {error || "The service you are looking for does not exist."}
            </p>
            <Link to="/services">
              <Button className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Services
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div
          className={`container mx-auto px-4 py-16 relative z-10 transition-all duration-1000 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Back to Services Link */}
          <Link
            to="/services"
            className="inline-flex items-center text-gray-600 hover:text-money-green mb-10 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to All Services</span>
          </Link>

          {/* Service Hero Section */}
          <div className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl text-3xl bg-green-100">
                {service.icon}
              </div>
              <div className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Premium Service
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {service.title}
            </h1>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Service Details - 7 columns on larger screens */}
            <div className="md:col-span-7">
              {/* Main description */}
              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {service.fullDescription}
                </p>

                <div className="flex flex-col gap-8">
                  {/* Benefits Section with improved design */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 inline-block">
                      Why Choose Our Service
                    </h2>

                    {Array.isArray(service.benefits) &&
                    service.benefits.length > 0 ? (
                      <div className="grid gap-4">
                        {service.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 group"
                          >
                            <div className="bg-green-100 text-green-700 rounded-full p-1 flex-shrink-0 mt-0.5 group-hover:bg-green-700 group-hover:text-white transition-colors">
                              <Check className="h-4 w-4" />
                            </div>
                            <p className="text-gray-700">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No benefits available for this service.
                      </p>
                    )}
                  </div>

                  {/* Process Steps Section with improved design */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 inline-block">
                      Our Process
                    </h2>

                    {Array.isArray(service.processSteps) &&
                    service.processSteps.length > 0 ? (
                      <div className="relative">
                        {service.processSteps.map((step, index) => (
                          <div key={index} className="mb-8 last:mb-0">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 relative">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                  {index + 1}
                                </div>
                                {/* Connecting line */}
                                {index < service.processSteps.length - 1 && (
                                  <div className="absolute left-1/2 transform -translate-x-1/2 top-10 h-full w-1 bg-gray-200"></div>
                                )}
                              </div>
                              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex-1">
                                <p className="text-gray-700 font-medium">
                                  {step}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No process steps available for this service.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Testimonial section */}
              <div className="mb-12 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="ml-2 text-sm font-medium text-gray-600">
                    5.0 out of 5
                  </p>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The {service.title.toLowerCase()} service exceeded our
                  expectations. The team was professional, responsive, and
                  delivered exceptional results that drove real business
                  growth."
                </p>
                <div className="font-medium text-gray-900">
                  — Finance Director, Leading Investment Firm
                </div>
              </div>

              {/* Request Service Button - Primary CTA */}
              <Link
                to="/contact"
                onClick={(e) => {
                  // Prevent default to avoid the automatic scroll behavior
                  e.preventDefault();
                  // Navigate programmatically without scrolling
                  window.location.href = "/contact";
                }}
              >
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all">
                  Request this Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Service Image and Call to Action - 5 columns on larger screens */}
            <div className="md:col-span-5">
              <div className="sticky top-24 space-y-8">
                {/* Featured Image with enhanced design */}
                <div className="rounded-2xl overflow-hidden shadow-xl relative group">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/800/600";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-sm font-medium text-white bg-green-600 px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Quick Consultation Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Get Started Today
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Schedule a free 30-minute consultation to discuss your{" "}
                    {service.title.toLowerCase()} needs and how we can help your
                    financial brand communicate more effectively.
                  </p>

                  {/* Consultation Options */}
                  <div className="space-y-4">
                    <a
                      href="https://calendly.com/akshay-satpaise99/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-lg group"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Schedule a Call
                        </h4>
                        <p className="text-sm text-gray-600">
                          30-min free consultation
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                    </a>

                    <Link
                      to="/contact"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/contact";
                      }}
                      className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-lg group"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Contact Us
                        </h4>
                        <p className="text-sm text-gray-600">
                          Send a detailed request
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>

                {/* Additional Info Cards */}
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl border border-green-100">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Typical Timeframe
                  </h4>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-green-600 mr-2" />
                    <p className="text-gray-700 text-sm">
                      2-4 weeks for full service
                    </p>
                  </div>
                </div>

                {/* Related Services */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">
                    You might also be interested in
                  </h4>
                  <div className="space-y-2">
                    <Link
                      to="/services/video-production-003"
                      onClick={(e) => {
                        // For service navigation links, let's preserve the scroll position as well
                        if (window.location.pathname.includes("/services/")) {
                          e.preventDefault();
                          window.location.href =
                            "/services/video-production-003";
                        }
                      }}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      <span className="text-sm">Video Production</span>
                    </Link>
                    <Link
                      to="/services/podcasts-007"
                      onClick={(e) => {
                        if (window.location.pathname.includes("/services/")) {
                          e.preventDefault();
                          window.location.href = "/services/podcasts-007";
                        }
                      }}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      <span className="text-sm">Audio Podcasts</span>
                    </Link>
                    <Link
                      to="/services/infographics-002"
                      onClick={(e) => {
                        if (window.location.pathname.includes("/services/")) {
                          e.preventDefault();
                          window.location.href = "/services/infographics-002";
                        }
                      }}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      <span className="text-sm">Infographics</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
