
import Layout from "@/components/Layout";
import Hero from "@/components/home/Hero";
import ClientMarquee from "@/components/home/ClientMarquee";
import ServicesGrid from "@/components/home/ServicesGrid";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ClientMarquee />
      <ServicesGrid />
      <TestimonialCarousel />
      <PortfolioPreview />
      <NewsletterSignup />
      <CallToAction />
    </Layout>
  );
};

export default Index;
