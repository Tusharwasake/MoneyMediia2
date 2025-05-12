import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Users,
  BookOpen,
  Shield,
  Globe,
  Star,
  Sparkles,
  FileText,
  BarChart,
  HeadphonesIcon,
  Camera,
  Film,
  MessageCircle,
  Mic,
  Video,
  Zap,
  Award,
  Clock,
  Building,
  Target,
  Calendar,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

interface Client {
  name: string;
  category: string;
  logo?: string;
  description?: string;
}

interface Stat {
  value: string;
  label: string;
  description: string;
  icon: JSX.Element;
}

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
}

const services: Service[] = [
  {
    id: "script-writing-001",
    title: "Script & Blog Writing",
    description:
      "Clear, engaging finance scripts and blogs that simplify complex topics",
    icon: <FileText className="h-6 w-6" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "infographics-002",
    title: "Infographics for Social & Ads",
    description:
      "Visually appealing infographics to boost engagement for marketing campaigns",
    icon: <BarChart className="h-6 w-6" />,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: "video-production-003",
    title: "End-to-End Video Production",
    description:
      "You just need to give us the topic, we deliver the final video content",
    icon: <Film className="h-6 w-6" />,
    color: "from-red-400 to-red-600",
  },
  {
    id: "translations-004",
    title: "Language Translations & Dubbing",
    description:
      "Translate videos into major Indian languages to reach all vernacular audiences",
    icon: <Globe className="h-6 w-6" />,
    color: "from-green-400 to-green-600",
  },
  {
    id: "shooting-005",
    title: "Professional Shooting",
    description:
      "Videos, podcasts, events—reels, podcasts, and more with professional quality",
    icon: <Camera className="h-6 w-6" />,
    color: "from-orange-400 to-orange-600",
  },
  {
    id: "brand-shoots-006",
    title: "Creative Brand Shoots",
    description:
      "High-quality brand shoots for compelling ads and TV commercials",
    icon: <Video className="h-6 w-6" />,
    color: "from-pink-400 to-pink-600",
  },
  {
    id: "podcasts-007",
    title: "Audio Podcasts",
    description: "Full-service production of finance-focused audio podcasts",
    icon: <Mic className="h-6 w-6" />,
    color: "from-amber-400 to-amber-600",
  },
  {
    id: "corporate-videos-008",
    title: "Corporate Videos",
    description:
      "Polished corporate videos showcasing your products, services, and brand stories",
    icon: <PlayCircle className="h-6 w-6" />,
    color: "from-indigo-400 to-indigo-600",
  },
];

const clients: Client[] = [
  {
    name: "Groww",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "AngelOne",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "HDFC Sky",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "FYERS",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "FINDOC",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "Share India",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "Choice",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "PESB",
    category: "Brokerage Houses",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "Edelweiss Mutual Fund",
    category: "Mutual Funds",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "ICICI Prudential Mutual Fund",
    category: "Mutual Funds",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "Groww Mutual Fund",
    category: "Mutual Funds",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "Paytm",
    category: "Fintech",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "uTrade Algos",
    category: "Fintech",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "SENSIBULL",
    category: "Fintech",
    logo: "/api/placeholder/160x80",
  },
  {
    name: "MARKETSCANNER",
    category: "Fintech",
    logo: "/api/placeholder/160x80",
  },
];

const stats: Stat[] = [
  {
    value: "100+",
    label: "Finance Videos",
    description: "Professional finance videos created with expertise",
    icon: <Video className="h-6 w-6" />,
  },
  {
    value: "15+",
    label: "Major Clients",
    description: "Leading financial institutions trust our content",
    icon: <Building className="h-6 w-6" />,
  },
  {
    value: "8+",
    label: "Languages",
    description: "Content delivered across multiple Indian languages",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    description: "Because we understand finance and video production",
    icon: <Award className="h-6 w-6" />,
  },
];

const team: TeamMember[] = [
  {
    name: "Akshay Satpaise",
    position: "Founder & CEO",
    bio: "Finance expert with extensive experience in creating engaging financial content.",
    image: "/api/placeholder/300/300",
  },
  {
    name: "Priya Sharma",
    position: "Head of Content",
    bio: "Specialized in translating complex financial concepts into accessible content.",
    image: "/api/placeholder/300/300",
  },
  {
    name: "Raj Mehta",
    position: "Video Production Lead",
    bio: "Expert in creating high-quality video content for financial institutions.",
    image: "/api/placeholder/300/300",
  },
];

const values = [
  {
    title: "Financial Expertise",
    description: "Deep understanding of financial markets and regulations",
    icon: <Shield className="h-6 w-6 text-white" />,
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Creative Excellence",
    description: "Bringing creativity to complex financial topics",
    icon: <Sparkles className="h-6 w-6 text-white" />,
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Client-Focused",
    description: "Dedicated to exceeding client expectations every time",
    icon: <Target className="h-6 w-6 text-white" />,
    color: "from-pink-500 to-pink-700",
  },
  {
    title: "Timely Delivery",
    description: "Efficient processes ensuring on-time project completion",
    icon: <Clock className="h-6 w-6 text-white" />,
    color: "from-green-500 to-green-700",
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("vision");
  const [animateIn, setAnimateIn] = useState(false);
  const [activeStat, setActiveStat] = useState<number | null>(null);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const groupedClients = clients.reduce((acc, client) => {
    if (!acc[client.category]) {
      acc[client.category] = [];
    }
    acc[client.category].push(client);
    return acc;
  }, {} as Record<string, Client[]>);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div
          className={`container mx-auto px-4 py-16 transition-all duration-1000 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Hero Section */}
          <div className="text-center mb-20 relative">
            {/* Background Elements */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Our Story</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                About Money Mediia
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                A specialized finance content marketing team bringing together
                financial expertise and premium video production for exceptional
                content.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <a
                  href="#who-we-are"
                  className="px-6 py-2 bg-white rounded-full text-gray-700 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
                >
                  Who We Are
                </a>
                <a
                  href="#our-services"
                  className="px-6 py-2 bg-white rounded-full text-gray-700 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
                >
                  Our Services
                </a>
                <a
                  href="#our-clients"
                  className="px-6 py-2 bg-white rounded-full text-gray-700 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
                >
                  Our Clients
                </a>
                <a
                  href="#why-us"
                  className="px-6 py-2 bg-white rounded-full text-gray-700 shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
                >
                  Why Choose Us
                </a>
              </div>
            </div>
          </div>

          {/* Who We Are */}
          <section id="who-we-are" className="mb-24 scroll-mt-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                    alt="Money Mediia Team"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/600/400";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-white">
                        Founded 2022
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-white">
                        Noida, India
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-green-500/10 rounded-full -z-10"></div>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-teal-500/20 rounded-full blur-xl"></div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 relative pb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:bg-gradient-to-r after:from-green-400 after:to-teal-400">
                  Who Are We?
                </h2>

                <p className="text-2xl text-transparent bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text font-semibold mb-6">
                  Your on-demand finance content marketing team.
                </p>

                <div className="space-y-6 text-gray-700">
                  <p className="text-lg">
                    Let's be honest—creating finance content isn't like making
                    lifestyle videos. You need precision, clarity, and someone
                    who actually understands financial compliance.
                  </p>

                  <p className="text-lg">
                    If you've ever tried explaining complex financial ideas to a
                    video editor, you know the pain. They nod along, but the end
                    result? Not quite right. Hours of revisions later, you're
                    still not there.
                  </p>

                  <p className="text-lg">
                    Finding someone who gets finance, speaks well, and can
                    handle video production? Nearly impossible.
                  </p>
                </div>

                {/* Vision/Mission/Values Tabs */}
                <div className="mt-10">
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                        activeTab === "vision"
                          ? "text-green-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("vision")}
                    >
                      Our Vision
                      {activeTab === "vision" && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-teal-400"></span>
                      )}
                    </button>
                    <button
                      className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                        activeTab === "mission"
                          ? "text-green-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("mission")}
                    >
                      Our Mission
                      {activeTab === "mission" && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-teal-400"></span>
                      )}
                    </button>
                    <button
                      className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                        activeTab === "values"
                          ? "text-green-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("values")}
                    >
                      Our Values
                      {activeTab === "values" && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-teal-400"></span>
                      )}
                    </button>
                  </div>

                  <div className="p-1">
                    {activeTab === "vision" && (
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          Our Vision
                        </h3>
                        <p className="text-gray-700">
                          To be the bridge that connects complex financial
                          knowledge with engaging, accessible content, making
                          finance understandable for everyone.
                        </p>
                      </div>
                    )}

                    {activeTab === "mission" && (
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          Our Mission
                        </h3>
                        <p className="text-gray-700">
                          To empower financial institutions with content that
                          educates, engages, and converts, helping them
                          communicate effectively with their audience.
                        </p>
                      </div>
                    )}

                    {activeTab === "values" && (
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          Our Values
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              Excellence in everything we do
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              Integrity and transparency in all communications
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              Innovation in content creation
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              Client-centered approach
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why we started */}
          <section className="mb-24">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-12 rounded-2xl shadow-xl relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full opacity-20 bg-gradient-to-br from-green-400 to-teal-500 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full opacity-20 bg-gradient-to-tr from-teal-400 to-green-500 blur-3xl"></div>

              <div className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Why We Started Money Mediia
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    We've put together a team of speakers, content writers,
                    graphic designers and video editors who get finance. No more
                    endless back-and-forth. Just sharp, accurate, and engaging
                    content—delivered fast.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 inline-block mx-auto">
                    <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text mb-2">
                      The Solution
                    </h3>
                    <p className="text-lg text-white">
                      Finance experts + Video production = Perfect content
                    </p>
                  </div>
                </div>

                {/* Core values cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}
                      >
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="our-services" className="mb-24 scroll-mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">What We Do</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                Our Services
              </h2>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive financial content solutions tailored for your
                specific needs
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${service.color}`}
                  ></div>
                  <div className="p-6">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-green-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.description}
                    </p>
                    <Link
                      to={`/services/${service.id}`}
                      className="text-green-600 font-medium text-sm flex items-center group/link"
                    >
                      Explore Service
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Statistics Section - Enhanced with more meaningful metrics */}
          <section className="mb-24 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl"></div>

            <div className="relative z-10 py-16 px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                  <BarChart className="h-4 w-4" />
                  <span className="text-sm font-medium">By The Numbers</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                  Our Impact
                </h2>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  The results we've achieved for financial brands across India
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-white p-8 rounded-xl shadow-lg text-center relative overflow-hidden"
                    onMouseEnter={() => setActiveStat(index)}
                    onMouseLeave={() => setActiveStat(null)}
                  >
                    <div
                      className={`absolute -top-20 -right-20 w-40 h-40 bg-green-50 rounded-full transform transition-all duration-500 ${
                        activeStat === index ? "scale-150" : "scale-100"
                      }`}
                    ></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                        {stat.icon}
                      </div>

                      <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text mb-2">
                        {stat.value}
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        {stat.label}
                      </h3>
                      <p className="text-gray-600">{stat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section - Removed as requested, focusing on company not individuals */}

          {/* Clients Section */}
          <section id="our-clients" className="mb-24 scroll-mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">Our Clients</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                Trusted By Industry Leaders
              </h2>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're proud to work with leading financial institutions across
                India
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(groupedClients).map(
                ([category, categoryClients], categoryIndex) => (
                  <div
                    key={category}
                    className="col-span-1 sm:col-span-2 lg:col-span-4 mt-10 first:mt-0"
                  >
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {categoryClients.map((client, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all flex items-center justify-center h-24"
                        >
                          <div className="font-semibold text-gray-800 text-center group hover:text-green-600 transition-colors">
                            {client.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Why Us */}
          <section id="why-us" className="mb-24 scroll-mt-24">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white mb-6">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Why Choose Us</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    What Sets Us Apart
                  </h2>

                  <p className="text-2xl font-semibold text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text mb-6">
                    We understand Finance + Video Production
                  </p>

                  <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                    With this unique combination, we not only save you the
                    headache of explaining financial jargon every time, but our
                    team's experience in creating 100+ videos on Finance ensures
                    the output meets your requirements without excessive
                    revisions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-7 w-7 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-center">
                        Finance Expertise
                      </h3>
                      <p className="text-gray-300 text-center">
                        Deep understanding of financial markets, products, and
                        regulatory requirements
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                        <Video className="h-7 w-7 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-center">
                        Video Production
                      </h3>
                      <p className="text-gray-300 text-center">
                        Professional production capabilities with attention to
                        detail and quality
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-7 w-7 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-center">
                        Quick Delivery
                      </h3>
                      <p className="text-gray-300 text-center">
                        Efficient processes ensuring timely delivery without
                        compromising quality
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-white shadow-xl rounded-3xl p-10 relative overflow-hidden border border-gray-100">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full -translate-x-1/4 -translate-y-1/2 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full translate-x-1/4 translate-y-1/2 opacity-50"></div>

              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                      Ready to Transform Your Financial Content?
                    </h2>

                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      Let's discuss how Money Mediia can help your financial
                      brand create content that educates, engages, and converts.
                      Schedule a free consultation today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/contact"
                        onClick={(e) => {
                          if (window.location.pathname.includes("/contact")) {
                            e.preventDefault();
                            window.location.href = "/contact";
                          }
                        }}
                      >
                        <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                          Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>

                      <a
                        href="https://calendly.com/akshay-satpaise99/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 px-8 py-3 rounded-xl text-lg transition-colors w-full sm:w-auto"
                      >
                        <Calendar className="h-5 w-5" />
                        Schedule a Call
                      </a>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 opacity-10 rounded-full blur-3xl transform scale-150"></div>
                      <div className="relative z-10 p-8">
                        <img
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                          alt="Financial Content Transformation"
                          className="w-full rounded-2xl shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/400/300";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
