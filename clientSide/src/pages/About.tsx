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
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface Client {
  name: string;
  category: string;
  description?: string;
}

interface Stat {
  value: string;
  label: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Script & Blog Writing",
    description:
      "Clear, engaging finance scripts and blogs that simplify complex topics",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: "Infographics for Social & Ads",
    description:
      "Visually appealing infographics to boost engagement for marketing campaigns",
    icon: <PlayCircle className="h-6 w-6" />,
  },
  {
    title: "End-to-End Video Production",
    description:
      "You just need to give us the topic, we deliver the final video content",
    icon: <PlayCircle className="h-6 w-6" />,
  },
  {
    title: "Language Translations & Dubbing",
    description:
      "Translate videos into major Indian languages to reach all vernacular audiences",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Professional Shooting",
    description:
      "Videos, podcasts, events—reels, podcasts, and more with professional quality",
    icon: <PlayCircle className="h-6 w-6" />,
  },
  {
    title: "Creative Brand Shoots",
    description:
      "High-quality brand shoots for compelling ads and TV commercials",
    icon: <Star className="h-6 w-6" />,
  },
  {
    title: "Audio Podcasts",
    description: "Full-service production of finance-focused audio podcasts",
    icon: <PlayCircle className="h-6 w-6" />,
  },
  {
    title: "Corporate Videos",
    description:
      "Polished corporate videos showcasing your products, services, and brand stories",
    icon: <PlayCircle className="h-6 w-6" />,
  },
];

const clients: Client[] = [
  { name: "Groww", category: "Brokerage Houses" },
  { name: "AngelOne", category: "Brokerage Houses" },
  { name: "HDFC Sky", category: "Brokerage Houses" },
  { name: "FYERS", category: "Brokerage Houses" },
  { name: "FINDOC", category: "Brokerage Houses" },
  { name: "Share India", category: "Brokerage Houses" },
  { name: "Choice - The Joy of Earning", category: "Brokerage Houses" },
  { name: "PESB - Your trust is our capital", category: "Brokerage Houses" },
  { name: "Edelweiss Mutual Fund", category: "Mutual Funds" },
  { name: "ICICI Prudential Mutual Fund", category: "Mutual Funds" },
  { name: "Groww Mutual Fund", category: "Mutual Funds" },
  { name: "Paytm", category: "Fintech" },
  { name: "uTrade Algos", category: "Fintech" },
  { name: "SENSIBULL", category: "Fintech" },
  {
    name: "MARKETSCANNER - Scanning Markets for Opportunities",
    category: "Fintech",
  },
];

const stats: Stat[] = [
  {
    value: "100+",
    label: "Finance Videos",
    description: "Professional finance videos created with expertise",
  },
  {
    value: "15+",
    label: "Major Clients",
    description: "Leading financial institutions trust our content",
  },
  {
    value: "8+",
    label: "Languages",
    description: "Content delivered across multiple Indian languages",
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    description: "Because we understand finance and video production",
  },
];

const About = () => {
  const groupedClients = clients.reduce((acc, client) => {
    if (!acc[client.category]) {
      acc[client.category] = [];
    }
    acc[client.category].push(client);
    return acc;
  }, {} as Record<string, Client[]>);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            About Money Mediia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A finance content marketing team specializing in financial
            communications and video production.
          </p>
        </div>

        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6">Who are we?</h2>
            <p className="text-2xl text-money-green font-semibold mb-6">
              Your on-demand finance content marketing team.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Let's be honest—creating finance content isn't like making
              lifestyle videos. You need precision, clarity, and someone who
              actually understands financial compliance.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              If you've ever tried explaining complex financial ideas to a video
              editor, you know the pain. They nod along, but the end result? Not
              quite right. Hours of revisions later, you're still not there.
            </p>
            <p className="text-lg text-gray-700">
              Finding someone who gets finance, speaks well, and can handle
              video production? Nearly impossible.
            </p>
          </div>
          <div className="bg-gradient-to-br from-money-green/10 to-money-teal/10 p-8 rounded-lg">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-money-green/20 rounded-full blur-xl"></div>
              </div>
              <div className="relative z-10 p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Finance ∩ Video Production
                </h3>
                <p className="text-lg text-gray-700">
                  Where expertise meets creativity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why we started */}
        <div className="bg-gray-50 p-8 rounded-lg mb-24">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why we started Money Mediia?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              We've put together a team of speakers, content writers, graphic
              designers and video editors who get finance.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              No more endless back-and-forth. Just sharp, accurate, and engaging
              content—delivered fast.
            </p>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-money-green mb-2">
                  The Solution
                </h3>
                <p className="text-lg text-gray-700">
                  Finance experts + Video production = Perfect content
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial content solutions for all your needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-money-green mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Clients</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by leading financial institutions across India
            </p>
          </div>

          {Object.entries(groupedClients).map(([category, categoryClients]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-money-green">
                {category}
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryClients.map((client, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-center"
                  >
                    <h4 className="font-semibold text-gray-800">
                      {client.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Why Us */}
        <div className="bg-gradient-to-r from-money-green/10 to-money-teal/10 p-8 rounded-lg mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why us?</h2>
            <p className="text-2xl font-semibold text-money-green mb-6">
              We understand Finance + Video Production
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With this combo, we not only save you the headache of explaining
              finance jargons every time but our team's experience in creating
              100+ videos on Finance makes sure the output is as per your
              requirement without too much fuss.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-money-green mx-auto mb-2" />
                <p className="font-medium">Finance Expertise</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-money-green mx-auto mb-2" />
                <p className="font-medium">Video Production</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-money-green mx-auto mb-2" />
                <p className="font-medium">Quick Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The impact we've made for financial brands
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl md:text-5xl font-bold text-money-green mb-2">
                  {stat.value}
                </div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 text-white p-12 rounded-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Financial Content?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Let's discuss how Money Mediia can help your financial brand
                create content that educates, engages, and converts.
              </p>
              <Link to="/contact">
                <Button className="btn-gradient px-8 py-6 text-lg">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:block text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-money-green to-money-teal opacity-20 rounded-full blur-xl transform scale-150"></div>
                <div className="relative z-10 p-8">
                  <Users className="h-32 w-32 text-money-green mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
