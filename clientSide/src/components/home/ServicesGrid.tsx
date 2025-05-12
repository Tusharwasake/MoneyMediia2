import React, { useState, useEffect } from "react";
import { Star, ChevronRight, ArrowRight } from "lucide-react";

const PremiumFinancialServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateIn(true);

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Service data with high-quality images from the database
  const services = [
    {
      id: "script-writing-001",
      serviceId: "script-writing",
      title: "Script & Blog Writing",
      description:
        "Clear, engaging finance scripts and blogs that simplify complex topics",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "content",
      isPopular: true,
      ctaText: "Craft Your Narrative",
      stats: "85% increase in client comprehension",
      icon: "✍️",
      secondaryStat: "72% higher conversion rate",
    },
    {
      id: "infographics-002",
      serviceId: "infographics",
      title: "Infographics for Social & Ads",
      description:
        "Visually appealing infographics to boost engagement for marketing campaigns",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "design",
      isPopular: false,
      ctaText: "Visualize Your Insights",
      stats: "67% better information retention",
      icon: "📊",
      secondaryStat: "42% increase in content sharing",
    },
    {
      id: "video-production-003",
      serviceId: "video-production",
      title: "End-to-End Video Production",
      description:
        "You just need to give us the topic, we deliver the final video content",
      image: "https://images.unsplash.com/photo-1540397106260-e24a507a08ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "visual",
      isPopular: true,
      ctaText: "Elevate Your Content",
      stats: "4x higher engagement rates",
      icon: "🎥",
      secondaryStat: "78% improved message recall",
    },
    {
      id: "translations-004",
      serviceId: "translations",
      title: "Language Translations & Dubbing",
      description:
        "Translate videos into major Indian languages to reach all vernacular audiences",
      image: "https://plus.unsplash.com/premium_photo-1661488481622-df81506bb046?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "content",
      isPopular: false,
      ctaText: "Expand Globally",
      stats: "Access to 40+ financial markets",
      icon: "🌐",
      secondaryStat: "Local compliance in all regions",
    },
    {
      id: "shooting-005",
      serviceId: "shooting",
      title: "Professional Shooting",
      description:
        "Videos, podcasts, events—reels, podcasts, and more with professional quality",
      image: "https://images.unsplash.com/photo-1633113088983-12fb3b2fe0ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "visual",
      isPopular: true,
      ctaText: "Capture Excellence",
      stats: "92% of clients report brand perception improvement",
      icon: "📽️",
      secondaryStat: "3.5x ROI on marketing materials",
    },
    {
      id: "brand-shoots-006",
      serviceId: "brand-shoots",
      title: "Creative Brand Shoots",
      description:
        "High-quality brand shoots for compelling ads and TV commercials",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "visual",
      isPopular: false,
      ctaText: "Transform Your Image",
      stats: "3x more trustworthy first impressions",
      icon: "🏢",
      secondaryStat: "62% stronger brand recognition",
    },
    {
      id: "podcasts-007",
      serviceId: "podcasts",
      title: "Audio Podcasts",
      description:
        "Full-service production of finance-focused audio podcasts",
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "visual",
      isPopular: false,
      ctaText: "Amplify Your Expertise",
      stats: "Reach 500K+ decision makers monthly",
      icon: "🎙️",
      secondaryStat: "65% listener conversion rate",
    },
    {
      id: "corporate-videos-008",
      serviceId: "corporate-videos",
      title: "Corporate Videos",
      description:
        "Polished corporate videos showcasing your products, services, and brand stories",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "visual",
      isPopular: false,
      ctaText: "Showcase Your Excellence",
      stats: "75% more effective than traditional presentations",
      icon: "📊",
      secondaryStat: "58% increase in client inquiries",
    },
  ];

  const categories = [
    { id: "all", label: "All Services" },
    { id: "content", label: "Content Creation" },
    { id: "visual", label: "Visual Media" },
    { id: "design", label: "Design Solutions" },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  // Money-green color variables
  const moneyGreen = "#00A86B";
  const moneyTeal = "#008080";

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-24 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-64 -right-64 w-96 h-96 rounded-full opacity-20 bg-teal-500"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 bg-green-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with animation */}
        <div className={`text-center mb-24 transition-all duration-1000 transform ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-green-100">
            <span className="mr-1">✨</span>
            <span className="text-sm font-medium text-green-600">
              Premium Financial Services
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
            Transform Your Financial Communication
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elevate your brand with content that educates, engages, and converts
            your financial audience
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 animate-on-scroll opacity-0 transition-all duration-700">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
              style={{
                transform:
                  activeCategory === category.id ? "scale(1.05)" : "scale(1)",
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="animate-on-scroll opacity-0 group relative h-[520px] rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl"
              style={{
                transform:
                  hoveredCard === service.id
                    ? "translateY(-10px)"
                    : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image with overlay */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform:
                      hoveredCard === service.id ? "scale(1.05)" : "scale(1)",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/800/600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
              </div>

              {/* Popular badge */}
              {service.isPopular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    MOST REQUESTED
                  </div>
                </div>
              )}

              {/* Category pill */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-medium uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 px-8 pt-16 pb-8 flex flex-col justify-end z-10 transition-all duration-500 h-full"
                style={{
                  transform: `translateY(${
                    hoveredCard === service.id ? "0" : "80px"
                  })`,
                }}>
                <div className="flex flex-col h-full justify-end">
                  {/* Title with underline */}
                  <h3 className="text-white text-2xl font-bold mb-3 relative pb-3">
                    {service.title}
                    <span className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 w-16 transition-all duration-500"
                      style={{
                        width: hoveredCard === service.id ? "40%" : "15%",
                      }}></span>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-8 transition-all duration-500 line-clamp-3"
                    style={{
                      opacity: hoveredCard === service.id ? 1 : 0.7,
                      transform: `translateY(${
                        hoveredCard === service.id ? "0" : "20px"
                      })`,
                    }}>
                    {service.description}
                  </p>

                  {/* Stats badges */}
                  <div className="flex flex-col gap-3 mb-8">
                    <div className="rounded-lg p-3 transition-all duration-500 flex items-center gap-3 bg-white/10 backdrop-blur-sm border-l-4 border-green-500"
                      style={{
                        opacity: hoveredCard === service.id ? 1 : 0,
                        transform: `translateY(${
                          hoveredCard === service.id ? "0" : "20px"
                        })`,
                      }}>
                      <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center bg-green-500/30">
                        📊
                      </div>
                      <p className="text-white font-medium text-sm">
                        {service.stats}
                      </p>
                    </div>

                    <div className="rounded-lg p-3 transition-all duration-500 flex items-center gap-3 bg-white/10 backdrop-blur-sm border-l-4 border-teal-500"
                      style={{
                        opacity: hoveredCard === service.id ? 1 : 0,
                        transform: `translateY(${
                          hoveredCard === service.id ? "0" : "20px"
                        })`,
                        transitionDelay: "0.2s",
                      }}>
                      <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center bg-teal-500/30">
                        📈
                      </div>
                      <p className="text-white font-medium text-sm">
                        {service.secondaryStat}
                      </p>
                    </div>
                  </div>

                  {/* CTA button - Using ID from database */}
                  <a
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-green-600 hover:text-white transition-all duration-300 w-full justify-center"
                  >
                    {service.ctaText}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Border effect */}
              <div
                className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none border border-white/10"
                style={{
                  opacity: hoveredCard === service.id ? 1 : 0.3,
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="mt-28 animate-on-scroll opacity-0 transition-all duration-700">
          <div className="max-w-4xl mx-auto px-12 py-14 rounded-2xl shadow-xl relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-600">
            {/* Abstract shapes */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-8 border-white"></div>
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full border-4 border-white"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-6">
                Ready to elevate your financial communication?
              </h3>
              <p className="text-white/80 mb-12 text-lg max-w-2xl">
                Join over 200+ financial institutions who trust our premium
                content solutions to transform their messaging and drive
                measurable results
              </p>
              <a href="https://calendly.com/akshay-satpaise99/30min" target="_blank" rel="noopener noreferrer">
                <button className="bg-white hover:bg-gray-50 font-bold py-5 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center gap-3 mx-auto text-green-600">
                  Schedule Free Consultation
                  <ChevronRight className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default PremiumFinancialServicesGrid;