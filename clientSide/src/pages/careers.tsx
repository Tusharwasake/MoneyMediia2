import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  ArrowRight,
  Banknote,
  Award,
  Monitor,
  Calendar,
  Coffee,
  Star,
  Clock,
  Globe,
  ChevronRight,
  ChevronDown,
  Check,
  Plus,
  Heart,
  MapPin,
  MessageSquare,
  Mail,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const CareerPage = () => {
  const [animateIn, setAnimateIn] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const navigate = useNavigate();

  // Helper function to handle navigation with scroll to top
  const handleNavigation = (to) => {
    navigate(to);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Sample job listings data
  const jobListings = [
    {
      id: "content-writer",
      title: "Financial Content Writer",
      department: "Content",
      location: "Remote",
      type: "Full-Time",
      salary: "₹4.5L - ₹6L/year",
      experience: "1-3 years",
      postedDate: "May 5, 2025",
      description:
        "We're looking for a talented Financial Content Writer who can transform complex financial concepts into engaging, easy-to-understand content for our clients in the financial sector.",
      responsibilities: [
        "Create compelling and accurate financial content for various formats (articles, blogs, scripts)",
        "Simplify complex financial concepts for different audience segments",
        "Ensure all content is SEBI and RBI compliant",
        "Work with subject matter experts to verify technical accuracy",
        "Meet content deadlines and quality standards",
      ],
      requirements: [
        "1-3 years of experience in financial content writing",
        "Strong understanding of financial markets, products, and regulations",
        "Excellent writing and editing skills",
        "Ability to translate technical jargon into accessible language",
        "Bachelor's degree in Finance, Economics, Journalism or related field",
      ],
      featured: true,
    },
    {
      id: "video-editor",
      title: "Financial Video Editor",
      department: "Production",
      location: "Mumbai",
      type: "Full-Time",
      salary: "₹5L - ₹8L/year",
      experience: "2-4 years",
      postedDate: "May 7, 2025",
      description:
        "Join our team as a Financial Video Editor to create polished, professional videos that explain financial concepts, showcase financial products, and engage audiences across different platforms.",
      responsibilities: [
        "Edit raw footage into polished financial videos for multiple platforms",
        "Create motion graphics and animations to visualize financial data",
        "Collaborate with content team to ensure messaging clarity",
        "Maintain brand consistency across all video content",
        "Optimize videos for different platforms (YouTube, Instagram, LinkedIn)",
      ],
      requirements: [
        "2-4 years of video editing experience, preferably in financial content",
        "Proficiency in Premiere Pro, After Effects, and other relevant software",
        "Strong portfolio demonstrating storytelling through video",
        "Understanding of financial concepts and terminology",
        "Ability to work under deadlines in a fast-paced environment",
      ],
      featured: true,
    },
    {
      id: "graphic-designer",
      title: "Financial Graphic Designer",
      department: "Design",
      location: "Remote",
      type: "Full-Time",
      salary: "₹4L - ₹7L/year",
      experience: "2-5 years",
      postedDate: "May 8, 2025",
      description:
        "We're seeking a talented Graphic Designer who specializes in creating visually compelling infographics, presentations, and visual content for financial services clients.",
      responsibilities: [
        "Design engaging infographics that translate complex financial data into visual stories",
        "Create branded templates for financial reports and presentations",
        "Develop visual assets for digital and print financial marketing materials",
        "Ensure all designs meet brand guidelines and compliance requirements",
        "Collaborate with content and marketing teams on integrated campaigns",
      ],
      requirements: [
        "2-5 years of graphic design experience, preferably in finance or related fields",
        "Proficiency in Adobe Creative Suite (Illustrator, Photoshop, InDesign)",
        "Strong portfolio showing data visualization and financial design work",
        "Understanding of financial terminology and common visual representations",
        "Bachelor's degree in Graphic Design or related field",
      ],
      featured: false,
    },
    {
      id: "marketing-manager",
      title: "Finance Marketing Manager",
      department: "Marketing",
      location: "Mumbai",
      type: "Full-Time",
      salary: "₹10L - ₹15L/year",
      experience: "5-8 years",
      postedDate: "May 10, 2025",
      description:
        "Lead our marketing efforts to promote our financial content services to banks, NBFCs, investment firms, and other financial institutions across India.",
      responsibilities: [
        "Develop and implement marketing strategies for our financial content services",
        "Build relationships with marketing departments at financial institutions",
        "Create proposal documents and presentation materials for potential clients",
        "Analyze market trends and competitor activities in the financial content space",
        "Work with content and production teams to showcase our capabilities",
      ],
      requirements: [
        "5-8 years of marketing experience, preferably in B2B financial services",
        "Strong understanding of the financial sector in India",
        "Excellent presentation and communication skills",
        "Experience with digital marketing, content marketing, and sales enablement",
        "MBA or equivalent degree in Marketing or related field",
      ],
      featured: false,
    },
    {
      id: "script-writer",
      title: "Financial Script Writer",
      department: "Content",
      location: "Remote",
      type: "Part-Time",
      salary: "₹30K - ₹50K/month",
      experience: "2-4 years",
      postedDate: "May 12, 2025",
      description:
        "We're looking for a part-time Financial Script Writer to develop compelling scripts for explainer videos, promotional content, and educational series for our financial clients.",
      responsibilities: [
        "Write clear, engaging scripts for financial videos and presentations",
        "Transform technical financial information into conversational narratives",
        "Work within time constraints for video duration and scene requirements",
        "Incorporate client feedback and regulatory requirements into scripts",
        "Collaborate with video production team on visualization opportunities",
      ],
      requirements: [
        "2-4 years of scriptwriting experience, preferably in finance or educational content",
        "Strong understanding of financial concepts and regulations",
        "Excellent storytelling abilities and conversational writing style",
        "Ability to work with strict word counts and timing requirements",
        "Background in finance or financial journalism preferred",
      ],
      featured: false,
    },
  ];

  // Filter jobs based on active category and location
  const filteredJobs = jobListings.filter((job) => {
    const matchesCategory =
      activeCategory === "all" ||
      job.department.toLowerCase() === activeCategory;
    const matchesLocation =
      filterLocation === "all" ||
      job.location.toLowerCase() === filterLocation.toLowerCase();
    return matchesCategory && matchesLocation;
  });

  // Get unique departments for filter
  const departments = [
    "all",
    ...new Set(jobListings.map((job) => job.department.toLowerCase())),
  ];

  // Get unique locations for filter
  const locations = ["all", ...new Set(jobListings.map((job) => job.location))];

  // Toggle accordion sections
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500 blur-3xl"></div>

          <div
            className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
              animateIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm font-medium">Join Our Team</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
                Careers at Money Mediia
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Join our talented team of financial content creators and help
                transform how financial institutions communicate with their
                audience.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#open-positions"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  View Open Positions
                  <ChevronDown className="h-4 w-4" />
                </a>

                <a
                  href="#culture"
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  Our Culture
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-1">
                  20+
                </div>
                <p className="text-gray-600">Team Members</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-1">
                  2
                </div>
                <p className="text-gray-600">Office Locations</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-1">
                  85%
                </div>
                <p className="text-gray-600">Employee Retention</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-1">
                  4.8/5
                </div>
                <p className="text-gray-600">Employee Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section id="culture" className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Our Culture</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why You'll Love Working With Us
              </h2>

              <p className="text-lg text-gray-600">
                At Money Mediia, we're dedicated to creating a positive,
                collaborative environment where talented professionals can
                thrive while making an impact on financial communication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Remote-First Culture</h3>
                <p className="text-gray-600 mb-4">
                  Work from anywhere with flexible hours. We focus on results,
                  not where or when you work.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Flexible working hours</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Work from anywhere policy</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Home office stipend</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Banknote className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Growth & Learning</h3>
                <p className="text-gray-600 mb-4">
                  We invest in your professional growth with dedicated learning
                  budgets and mentorship opportunities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Annual learning budget</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Regular skill development workshops</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Clear career progression paths</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Work-Life Balance</h3>
                <p className="text-gray-600 mb-4">
                  We believe in sustainable productivity and respect your time
                  outside of work.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Generous PTO policy</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Mental health days</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>No weekend work expectations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Competitive Benefits</h3>
                <p className="text-gray-600 mb-4">
                  Beyond competitive salaries, we offer benefits that matter to
                  you and your family.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Health insurance coverage</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Performance bonuses</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Retirement plans</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Meaningful Work</h3>
                <p className="text-gray-600 mb-4">
                  Your work will help millions understand financial concepts and
                  make better financial decisions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>High-impact projects</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Work with top financial brands</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Financial literacy initiatives</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Team & Culture</h3>
                <p className="text-gray-600 mb-4">
                  Join a diverse, supportive team that celebrates wins together
                  and helps each other grow.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Regular team retreats</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Collaborative environment</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Recognition programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 mb-6">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Team Voices</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Hear From Our Team
              </h2>

              <p className="text-lg text-gray-600">
                Our employees share their experiences working at Money Mediia
                and what makes our culture special.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-8 relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="text-6xl text-purple-200">"</div>
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  "As a content writer at Money Mediia, I love how we're
                  encouraged to dig deep into financial topics and really make
                  them accessible. The flexible work environment and supportive
                  team make this the best job I've had."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-purple-600">SK</span>
                  </div>
                  <div>
                    <p className="font-bold">Shreya Kumar</p>
                    <p className="text-sm text-gray-500">
                      Senior Content Writer
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8 relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="text-6xl text-green-200">"</div>
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  "The growth opportunities at Money Mediia are unmatched. I
                  started as a junior designer and within two years was leading
                  design projects for major financial institutions. The learning
                  budget really helped me upskill."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-green-600">RJ</span>
                  </div>
                  <div>
                    <p className="font-bold">Rahul Joshi</p>
                    <p className="text-sm text-gray-500">
                      Lead Graphic Designer
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8 relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="text-6xl text-blue-200">"</div>
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  "The remote-first approach at Money Mediia has been a
                  game-changer for me. I can work from anywhere while still
                  feeling connected to my team. The work is challenging but
                  manageable, with real respect for work-life balance."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">AP</span>
                  </div>
                  <div>
                    <p className="font-bold">Ananya Patel</p>
                    <p className="text-sm text-gray-500">Video Producer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm font-medium">Current Openings</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Open Positions
              </h2>

              <p className="text-lg text-gray-600 mb-8">
                Find your perfect role in our growing team and help shape the
                future of financial communication.
              </p>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="inline-flex overflow-hidden rounded-lg border border-gray-200">
                  <select
                    className="bg-white px-4 py-2.5 focus:outline-none text-gray-700"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments
                      .filter((d) => d !== "all")
                      .map((dept) => (
                        <option key={dept} value={dept}>
                          {dept.charAt(0).toUpperCase() + dept.slice(1)}
                        </option>
                      ))}
                  </select>

                  <select
                    className="bg-white px-4 py-2.5 focus:outline-none text-gray-700 border-l border-gray-200"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                  >
                    <option value="all">All Locations</option>
                    {locations
                      .filter((l) => l !== "all")
                      .map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Featured Jobs */}
            {filteredJobs.some((job) => job.featured) && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Featured Opportunities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {filteredJobs
                    .filter((job) => job.featured)
                    .map((job) => (
                      <div
                        key={job.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-green-500 hover:shadow-lg transition-all"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                  Featured
                                </span>
                                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                  {job.type}
                                </span>
                              </div>
                              <h4 className="text-xl font-bold mb-1">
                                {job.title}
                              </h4>
                              <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                                <div className="flex items-center gap-1">
                                  <Briefcase className="h-4 w-4" />
                                  <span>{job.department}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{job.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-100 px-3 py-1.5 rounded-lg">
                              <span className="text-gray-700 font-medium">
                                {job.salary}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-5 line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              Posted on {job.postedDate}
                            </div>
                            <a
                              href={`#job-${job.id}`}
                              className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors gap-1"
                              onClick={() => toggleAccordion(job.id)}
                            >
                              View Details
                              <ChevronRight className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* All Job Listings */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <div
                      key={job.id}
                      id={`job-${job.id}`}
                      className={`border-b border-gray-200 last:border-b-0 ${
                        activeAccordion === job.id ? "bg-gray-50" : ""
                      }`}
                    >
                      <div
                        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleAccordion(job.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-bold">{job.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mt-1">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5" />
                                <span>{job.department}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{job.experience}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="hidden md:block text-sm px-2.5 py-1 bg-gray-100 rounded-full">
                              <span className="text-gray-700">{job.type}</span>
                            </div>
                            <div className="text-gray-700 text-sm font-medium hidden md:block">
                              {job.salary}
                            </div>
                            <div
                              className={`transform transition-transform ${
                                activeAccordion === job.id ? "rotate-180" : ""
                              }`}
                            >
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Job details accordion content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          activeAccordion === job.id
                            ? "max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-6 pt-0 border-t border-gray-200">
                          <div className="prose max-w-none">
                            <p className="text-gray-600 mb-6">
                              {job.description}
                            </p>

                            <div className="mb-6">
                              <h5 className="text-lg font-bold mb-3">
                                Key Responsibilities:
                              </h5>
                              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                {job.responsibilities.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="mb-8">
                              <h5 className="text-lg font-bold mb-3">
                                Requirements:
                              </h5>
                              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                {job.requirements.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                              <a
                                href={`/career/apply/${job.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavigation(`/career/apply/${job.id}`);
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-md transition-all text-center"
                              >
                                Apply for this position
                              </a>

                              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>Email to a friend</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-700 mb-2">
                      No positions found
                    </h4>
                    <p className="text-gray-500 mb-4">
                      We couldn't find any positions matching your current
                      filters.
                    </p>
                    <button
                      onClick={() => {
                        setActiveCategory("all");
                        setFilterLocation("all");
                      }}
                      className="text-green-600 font-medium hover:text-green-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white mb-6">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Application Process</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How to Join Our Team
              </h2>

              <p className="text-lg text-gray-300">
                Our application process is straightforward and designed to help
                us both determine if we're a good fit for each other.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto text-center">
              <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Apply Online</h3>
                <p className="text-gray-300 text-sm">
                  Submit your application through our careers page with your
                  resume and cover letter.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Initial Screening</h3>
                <p className="text-gray-300 text-sm">
                  Our hiring team will review your application and reach out for
                  an initial conversation.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Skill Assessment</h3>
                <p className="text-gray-300 text-sm">
                  Complete a practical assignment related to the role you're
                  applying for.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Final Interview</h3>
                <p className="text-gray-300 text-sm">
                  Meet with the team you'll be working with and discuss your
                  potential role in detail.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-300 max-w-xl mx-auto mb-6">
                We aim to complete the entire process within 2-3 weeks to
                respect your time. All candidates receive feedback regardless of
                outcome.
              </p>

              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                View Open Positions
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 mb-6">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Frequently Asked Questions
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Common Questions
              </h2>

              <p className="text-lg text-gray-600">
                Find answers to the most frequently asked questions about
                working at Money Mediia.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="application" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger
                    value="application"
                    className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                  >
                    Application
                  </TabsTrigger>
                  <TabsTrigger
                    value="remote"
                    className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                  >
                    Remote Work
                  </TabsTrigger>
                  <TabsTrigger
                    value="benefits"
                    className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                  >
                    Benefits
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="application"
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        What should I include in my application?
                      </h3>
                      <p className="text-gray-600">
                        Your resume, a tailored cover letter, and relevant
                        portfolio examples or work samples that demonstrate your
                        skills and experience in financial content creation.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        How long does the application process take?
                      </h3>
                      <p className="text-gray-600">
                        We aim to complete the entire process within 2-3 weeks,
                        though this may vary depending on the position and
                        number of applicants. We'll keep you informed at every
                        stage.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        Can I apply for multiple positions?
                      </h3>
                      <p className="text-gray-600">
                        Yes, you can apply for up to two positions that align
                        with your skills and experience. Please submit separate
                        applications for each role.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        What if there are no current openings in my field?
                      </h3>
                      <p className="text-gray-600">
                        You can submit your resume for future consideration. We
                        keep promising candidates in our talent pool and reach
                        out when relevant positions open up.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="remote"
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        Can I work fully remote?
                      </h3>
                      <p className="text-gray-600">
                        Yes, we're a remote-first company. Most positions can be
                        performed entirely remotely from anywhere in India,
                        though some roles may require occasional visits to our
                        offices or client sites.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        How do you maintain team culture with remote work?
                      </h3>
                      <p className="text-gray-600">
                        We host regular virtual team events, quarterly in-person
                        meetups (optional), and maintain open communication
                        channels. We've built a strong remote culture focused on
                        results and collaboration.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        What equipment do you provide for remote workers?
                      </h3>
                      <p className="text-gray-600">
                        We provide a home office stipend to set up your
                        workspace and all necessary software subscriptions. For
                        certain roles, we may provide additional specialized
                        equipment.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        Are there set working hours?
                      </h3>
                      <p className="text-gray-600">
                        We focus on results rather than hours worked. While we
                        do have some core collaboration hours (typically 12-4 PM
                        IST), you generally have flexibility in setting your
                        schedule.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="benefits"
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        What benefits do you offer?
                      </h3>
                      <p className="text-gray-600">
                        We offer comprehensive health insurance, retirement
                        plans, annual learning budgets, home office stipends,
                        generous PTO, and performance bonuses.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        Do you provide training and development opportunities?
                      </h3>
                      <p className="text-gray-600">
                        Yes, all team members receive an annual learning budget
                        for courses and conferences. We also host regular
                        internal workshops and provide mentorship opportunities.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        What is your PTO policy?
                      </h3>
                      <p className="text-gray-600">
                        We offer 15 days of annual leave, plus all national
                        holidays, 5 sick days, and 2 mental health days.
                        Additionally, we have a sabbatical program for long-term
                        employees.
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        Are there opportunities for advancement?
                      </h3>
                      <p className="text-gray-600">
                        Absolutely. We have clear career progression paths and
                        regularly promote from within. We conduct performance
                        reviews twice annually to discuss growth opportunities.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join Our Team?
              </h2>

              <p className="text-xl text-white/90 mb-8">
                Explore our open positions and take the next step in your career
                with Money Mediia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#open-positions"
                  className="px-8 py-4 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-all text-center"
                >
                  View Open Positions
                </a>

                <a
                  href="mailto:careers@moneymediia.com"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Recruitment Team</span>
                </a>
              </div>

              <p className="mt-8 text-white/70">
                Don't see the right position? Email your resume to{" "}
                <a
                  href="mailto:careers@moneymediia.com"
                  className="underline hover:text-white"
                >
                  careers@moneymediia.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CareerPage;
