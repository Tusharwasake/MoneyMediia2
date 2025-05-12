import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Send,
  MessageSquare,
  Globe,
  Calendar,
  CheckCircle,
  Sparkles,
  Clock,
  User,
  Building,
  List,
  ChevronDown,
  MessageCircle,
  ArrowRight,
  Lock,
} from "lucide-react";
import { submitContactForm, ContactFormData } from "@/api/contactus.api";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Financial services array (hardcoded instead of fetching)
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
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElement = e.currentTarget; // Store the form element reference
    const formData = new FormData(formElement);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      companyName: formData.get("companyName") as string,
      serviceOfInterest: formData.get("serviceOfInterest") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await submitContactForm(data);
      if (response.data.success) {
        setFormSuccess(true);
        toast({
          title: "Message Sent Successfully",
          description: response.data.message,
        });

        // Check if the form element still exists before resetting
        if (formElement) {
          formElement.reset();
        }

        // Reset form success after a delay
        setTimeout(() => {
          setFormSuccess(false);
        }, 5000);
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "akshay@moneymediia.com",
      link: "mailto:akshay@moneymediia.com",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call",
      content: "+91 8484819808",
      link: "tel:+918484819808",
      color: "bg-green-50 text-green-600",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "WhatsApp",
      content: "Chat with us",
      link: "https://wa.me/918484819808",
      color: "bg-emerald-50 text-emerald-600",
      hoverColor: "hover:bg-emerald-100",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Website",
      content: "www.moneymediia.com",
      link: "https://moneymediia.com/",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
  ];

  const quickOptions = [
    {
      title: "Schedule a Call",
      description: "Book a 30-minute consultation",
      icon: <Calendar className="h-6 w-6" />,
      link: "https://calendly.com/akshay-satpaise99/30min",
      color: "bg-orange-50 text-orange-600",
      hoverColor: "group-hover:bg-orange-100",
    },
    {
      title: "WhatsApp Chat",
      description: "Get quick answers to your questions",
      icon: <MessageCircle className="h-6 w-6" />,
      link: "https://wa.me/918484819808",
      color: "bg-green-50 text-green-600",
      hoverColor: "group-hover:bg-green-100",
    },
  ];

  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden py-16">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div
          className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </h1>

            <p className="text-xl text-gray-600 mx-auto mb-10">
              Ready to transform your financial content? Connect with our expert
              team for quick, accurate, and engaging financial content solutions
              tailored to your needs.
            </p>

            {/* Enhanced contact options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {/* Quick call option */}
              <a
                href="tel:+918484819808"
                className="group flex flex-col items-center gap-3 p-6 bg-blue-50 hover:bg-blue-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    Call Us
                  </h3>
                  <p className="text-blue-600 font-medium">+91 848-481-9808</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available 9am-6pm IST
                  </p>
                </div>
              </a>

              {/* WhatsApp option */}
              <a
                href="https://wa.me/918484819808"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 bg-green-50 hover:bg-green-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    WhatsApp
                  </h3>
                  <p className="text-green-600 font-medium">Chat with us</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Quick responses guaranteed
                  </p>
                </div>
              </a>

              {/* Calendar option */}
              <a
                href="https://calendly.com/akshay-satpaise99/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 bg-purple-50 hover:bg-purple-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    Schedule
                  </h3>
                  <p className="text-purple-600 font-medium">
                    Book a consultation
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    30-minute free session
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-24">
            {/* Contact Form Column - spans 8 columns */}
            <div className="lg:col-span-8 space-y-8">
              {/* Form Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Send Us a Message
                      </h2>
                      <p className="text-gray-500">
                        Fill out the form below and we'll get back to you within
                        24 hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                        >
                          <User className="h-4 w-4 text-gray-400" />
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          required
                          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          onFocus={() => setActiveField("name")}
                          onBlur={() => setActiveField(null)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                        >
                          <Mail className="h-4 w-4 text-gray-400" />
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="john@company.com"
                          required
                          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          onFocus={() => setActiveField("email")}
                          onBlur={() => setActiveField(null)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="companyName"
                          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                        >
                          <Building className="h-4 w-4 text-gray-400" />
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          placeholder="Your Company"
                          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          onFocus={() => setActiveField("companyName")}
                          onBlur={() => setActiveField(null)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="serviceOfInterest"
                          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                        >
                          <List className="h-4 w-4 text-gray-400" />
                          Service of Interest{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="serviceOfInterest"
                            name="serviceOfInterest"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-all duration-300"
                            onFocus={() => setActiveField("serviceOfInterest")}
                            onBlur={() => setActiveField(null)}
                            required
                          >
                            <option value="">Select a service</option>
                            {services.map((service) => (
                              <option key={service.value} value={service.value}>
                                {service.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      >
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us about your project requirements..."
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-300"
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Lock className="h-3 w-3" />
                      <p>
                        Your information is secure and will not be shared with
                        third parties
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className={`w-full py-5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                        formSuccess
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                      }`}
                      disabled={isSubmitting || formSuccess}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </div>
                      ) : formSuccess ? (
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          <span>Message Sent Successfully!</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Send Message</span>
                          <Send className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Form completion progress bar */}
                <div className="h-1.5 w-full bg-gray-100">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-700"
                    style={{
                      width:
                        activeField === "name"
                          ? "20%"
                          : activeField === "email"
                          ? "40%"
                          : activeField === "companyName"
                          ? "60%"
                          : activeField === "serviceOfInterest"
                          ? "80%"
                          : activeField === "message"
                          ? "100%"
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Frequently asked questions */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      What is your typical turnaround time?
                    </h4>
                    <p className="text-gray-600">
                      Our typical turnaround time is 2-4 weeks for most
                      services, depending on the scope and complexity of the
                      project.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Do you work with clients outside of India?
                    </h4>
                    <p className="text-gray-600">
                      Yes, we work with financial institutions globally. Our
                      team can handle projects in multiple languages and time
                      zones.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      How do you ensure financial compliance?
                    </h4>
                    <p className="text-gray-600">
                      We have experts familiar with SEBI, RBI, and international
                      financial regulations to ensure all content meets
                      compliance standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Column - spans 4 columns */}
            <div className="lg:col-span-4 space-y-8">
              {/* Contact information card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-4 rounded-xl ${info.color} ${info.hoverColor} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group`}
                    >
                      <div className="p-3 bg-white rounded-lg shadow-sm mr-4 group-hover:shadow-md transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {info.title}
                        </h3>
                        <p className="text-gray-700">{info.content}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Working hours card */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl shadow-xl text-white p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Working Hours</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM IST</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-white/90 text-sm">
                    For urgent inquiries outside of business hours, please email
                    us and we'll respond as soon as possible.
                  </p>
                </div>
              </div>

              {/* Trust badge */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="text-yellow-400">
                        ★
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The team transformed our complex financial topics into
                  engaging, accessible content. Highly recommended!"
                </p>
                <p className="font-medium text-gray-900">
                  — Financial Director, Leading Investment Firm
                </p>
              </div>
            </div>
          </div>

          {/* Map or location section */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-16 border border-gray-100">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Our Office Location</h3>
                <p className="opacity-90">Visit us at our Noida office</p>
              </div>
              <a
                href="https://maps.google.com/?q=Noida,Uttar+Pradesh,India"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 bg-white text-green-600 px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                Get Directions
              </a>
            </div>
            <div className="h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923190164!2d77.06889754725774!3d28.5274693775145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1683651091696!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
