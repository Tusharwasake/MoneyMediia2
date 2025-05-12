import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import Portfolio from "./pages/Portfolio";
import PortfolioVideos from "./pages/PortfolioVideos";
import PortfolioBlogs from "./pages/PortfolioBlogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CareerPage from "@/pages/careers"; // Import the Career Page
import PrivacyPolicy from "@/pages/staticPage/PrivacyPolicy"; // Import Privacy Policy
import TermsOfService from "./pages/staticPage/Terms"; // Import Terms of Service

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/videos" element={<PortfolioVideos />} />
          <Route path="/portfolio/blogs" element={<PortfolioBlogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<CareerPage />} /> {/* Career Page */}
          <Route
            path="/staticPage/PrivacyPolicy"
            element={<PrivacyPolicy />}
          />{" "}
          {/* Privacy Policy */}
          <Route path="/staticPage/terms" element={<TermsOfService />} />{" "}
          {/* Terms of Service */}
          {/* Add more routes as needed */}
          {/* Fallback route for 404 Not Found */}
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
