import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  Globe,
  Users,
  Building,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Your Google Form configuration - replace these with your actual values
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScJQideJdtAvv540lBX-putG7iy_VQREuLZUXWJeHsnGDZHAw/formResponse";
  const FORM_FIELDS = {
    name: "entry.YOUR_NAME_FIELD_ID",
    email: "entry.YOUR_EMAIL_FIELD_ID",
    company: "entry.YOUR_COMPANY_FIELD_ID",
    service: "entry.YOUR_SERVICE_FIELD_ID",
    message: "entry.YOUR_MESSAGE_FIELD_ID",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Create request to Google Form
      const response = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // Since mode is 'no-cors', we can't read the response but submission works
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 1-2 business days.",
      });

      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { value: "Script & Blog Writing", label: "Script & Blog Writing" },
    {
      value: "Infographics for Social & Ads",
      label: "Infographics for Social & Ads",
    },
    {
      value: "End-to-End Video Production",
      label: "End-to-End Video Production",
    },
    {
      value: "Language Translations & Dubbing",
      label: "Language Translations & Dubbing",
    },
    { value: "Professional Shooting", label: "Professional Shooting" },
    { value: "Creative Brand Shoots", label: "Creative Brand Shoots" },
    { value: "Audio Podcasts", label: "Audio Podcasts" },
    { value: "Corporate Videos", label: "Corporate Videos" },
    { value: "Other", label: "Other/General Inquiry" },
  ];

  const faqs = [
    {
      question: "Why choose Money Mediia over other finance content agencies?",
      answer:
        "We understand Finance + Video Production. Our specialized team speaks finance fluently, eliminating the need for endless revisions. With experience creating 100+ finance videos, we deliver accurate, engaging content without the usual headaches of explaining complex financial concepts.",
    },
    {
      question: "What's your typical turnaround time for projects?",
      answer:
        "Most projects are completed within 5-10 business days. For urgent requests, we offer fast-track options to deliver even quicker.",
    },
    {
      question: "Do you work with all types of financial companies?",
      answer:
        "Yes! We work with brokerage houses, mutual funds, fintech companies, and financial advisors across India. Our portfolio includes major brands like Groww, Paytm, HDFC Sky, and Edelweiss.",
    },
    {
      question: "How do we ensure content accuracy and compliance?",
      answer:
        "Our team includes finance experts who review every piece of content for technical accuracy. We work closely with your compliance team to ensure all regulatory requirements are met.",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "akshay@moneymediia.com",
      link: "mailto:akshay@moneymediia.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call",
      content: "+91 8484819808",
      link: "tel:+918484819808",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "WhatsApp",
      content: "Chat with us",
      link: "https://wa.me/918484819808",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Website",
      content: "www.moneymediia.com",
      link: "https://moneymediia.com/",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your financial content? Connect with our expert
            team for quick, accurate, and engaging financial content solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          {/* Google Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-money-green/10 rounded-lg">
                  <Send className="h-6 w-6 text-money-green" />
                </div>
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name={FORM_FIELDS.name}
                      placeholder="John Doe"
                      required
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-money-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name={FORM_FIELDS.email}
                      placeholder="john@company.com"
                      required
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-money-green focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name={FORM_FIELDS.company}
                      placeholder="Your Company"
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-money-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name={FORM_FIELDS.service}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-money-green focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name={FORM_FIELDS.message}
                    rows={5}
                    placeholder="Tell us about your project requirements..."
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-money-green focus:border-transparent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="btn-gradient w-full py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Send Message
                      <Send className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information & Sidebar */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-money-green mr-4">{info.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{info.title}</h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-money-green" />
                <h3 className="text-xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-gray-700">Saturday - Sunday: Closed</p>
                <p className="text-sm text-gray-500 mt-4">
                  Indian Standard Time (IST)
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/money-mediia12/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-money-green hover:text-white rounded-full transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/market_boys3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-money-green hover:text-white rounded-full transition-all"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/918484819808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-money-green hover:text-white rounded-full transition-all"
                >
                  <MessageSquare className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold mb-3 text-money-green">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-900 text-white p-12 rounded-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Why Choose Money Mediia?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We combine financial expertise with creative excellence to deliver
              content that drives results.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-money-green mb-4">
                  <CheckCircle className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="font-bold mb-2">Finance Expertise</h3>
                <p className="text-gray-400">
                  Deep understanding of financial concepts and compliance
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-money-green mb-4">
                  <Building className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="font-bold mb-2">Trusted by Leaders</h3>
                <p className="text-gray-400">
                  Working with top financial institutions across India
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-money-green mb-4">
                  <Users className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="font-bold mb-2">End-to-End Solution</h3>
                <p className="text-gray-400">
                  From concept to delivery, we handle everything
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
