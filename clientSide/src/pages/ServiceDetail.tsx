
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

// Define the service details with more extensive content
const serviceDetails = {
  "script-writing": {
    title: "Script Writing",
    description: "Professional financial script writing services tailored for various video formats and target audiences.",
    icon: "✍️",
    fullDescription: "Our expert financial script writers transform complex financial concepts into clear, engaging narratives that resonate with your target audience. We specialize in creating scripts for explainer videos, educational content, promotional materials, and more.",
    benefits: [
      "Clear communication of complex financial topics",
      "Engaging storytelling that captures audience attention",
      "Industry-compliant language that meets regulatory requirements",
      "Customized tone and style to match your brand voice"
    ],
    processSteps: [
      "Initial consultation to understand your objectives",
      "Research and concept development",
      "First draft creation with timing and visual notes",
      "Revisions based on your feedback",
      "Final script delivery with production guidelines"
    ],
    imageSrc: "https://placehold.it/800x500?text=Script+Writing"
  },
  "infographics": {
    title: "Infographics",
    description: "Compelling visual representations of complex financial data and concepts for better audience engagement.",
    icon: "📊",
    fullDescription: "Our infographic services transform complex financial data into visually compelling stories. We combine expert financial knowledge with graphic design skills to create infographics that simplify information and increase engagement.",
    benefits: [
      "Simplified visualization of complex financial data",
      "Increased audience engagement and information retention",
      "Shareable content for social media and marketing campaigns",
      "Brand-consistent visual representation of financial information"
    ],
    processSteps: [
      "Data analysis and information architecture planning",
      "Conceptual design and wireframing",
      "Visual design development with brand alignment",
      "Client review and refinement",
      "Final delivery in multiple formats for various platforms"
    ],
    imageSrc: "https://placehold.it/800x500?text=Infographics"
  },
  "video-production": {
    title: "Video Production",
    description: "End-to-end video production services for financial content, from concept to final delivery.",
    icon: "🎥",
    fullDescription: "Our comprehensive video production services handle every aspect of creating compelling financial videos. From initial concept development to final delivery, we ensure high-quality production that effectively communicates your financial message.",
    benefits: [
      "Professional-quality videos that enhance brand credibility",
      "Engaging visual storytelling that simplifies financial concepts",
      "Consistent brand representation across all video content",
      "Multi-format delivery for various platforms and channels"
    ],
    processSteps: [
      "Concept development and script creation",
      "Pre-production planning and storyboarding",
      "Professional filming with experienced crew",
      "Post-production editing and graphics integration",
      "Review, refinement, and final delivery"
    ],
    imageSrc: "https://placehold.it/800x500?text=Video+Production"
  },
  "translations": {
    title: "Translations",
    description: "Accurate financial content translations that maintain technical accuracy and cultural relevance.",
    icon: "🌐",
    fullDescription: "Our financial translation services ensure your content resonates globally while maintaining technical accuracy. We work with specialized translators who understand both financial terminology and cultural nuances for truly effective communication.",
    benefits: [
      "Technical accuracy in financial terminology across languages",
      "Cultural adaptation for effective regional communication",
      "Consistency in brand voice across all translated materials",
      "Regulatory compliance across different markets"
    ],
    processSteps: [
      "Content analysis and terminology research",
      "Translation by financial industry specialists",
      "Review by native speakers with financial expertise",
      "Quality assurance and consistency checks",
      "Final delivery with localization recommendations"
    ],
    imageSrc: "https://placehold.it/800x500?text=Translations"
  },
  "shooting": {
    title: "Shooting",
    description: "High-quality video shooting with professional equipment and experienced crew for financial sector clients.",
    icon: "📽️",
    fullDescription: "Our professional shooting services provide the highest quality footage for your financial content needs. With state-of-the-art equipment and an experienced crew specialized in financial sector filming, we capture your message perfectly.",
    benefits: [
      "Professional-grade footage that enhances credibility",
      "Experienced crew familiar with financial sector requirements",
      "Optimal lighting and sound for clear communication",
      "Flexible shooting plans for various locations and scenarios"
    ],
    processSteps: [
      "Location scouting and shooting plan development",
      "Equipment selection and crew assignment",
      "Professional filming with expert direction",
      "Multiple takes and angles for editing flexibility",
      "Footage review and transfer for post-production"
    ],
    imageSrc: "https://placehold.it/800x500?text=Professional+Shooting"
  },
  "brand-shoots": {
    title: "Brand Shoots",
    description: "Specialized photography and video sessions to enhance your financial brand's visual identity.",
    icon: "🏢",
    fullDescription: "Our brand shoots create a cohesive visual identity for your financial brand. We capture professional imagery that conveys trust, expertise, and your unique brand values through carefully planned photography and video sessions.",
    benefits: [
      "Consistent visual brand identity across all platforms",
      "Professional imagery that builds trust and credibility",
      "Customized visual storytelling aligned with brand values",
      "Versatile content library for various marketing needs"
    ],
    processSteps: [
      "Brand identity analysis and visual strategy planning",
      "Shot list and style guide development",
      "Professional photography and video session",
      "Selection and professional editing of best imagery",
      "Organization and delivery of complete visual library"
    ],
    imageSrc: "https://placehold.it/800x500?text=Brand+Shoots"
  },
  "podcasts": {
    title: "Podcasts",
    description: "Professional podcast production services for financial topics, including recording, editing, and distribution.",
    icon: "🎙️",
    fullDescription: "Our financial podcast production services help you create engaging audio content that positions your brand as a thought leader. From concept development to distribution, we handle every aspect of creating professional financial podcasts.",
    benefits: [
      "Established thought leadership in the financial sector",
      "Engaging audio content for audience education and engagement",
      "Professional sound quality that enhances brand perception",
      "Distribution strategy that maximizes reach and impact"
    ],
    processSteps: [
      "Content strategy and episode planning",
      "Professional recording with expert sound engineering",
      "Skilled editing and production for optimal sound quality",
      "Addition of music, intros, and outros for brand consistency",
      "Distribution across major podcast platforms"
    ],
    imageSrc: "https://placehold.it/800x500?text=Podcasts"
  },
  "corporate-videos": {
    title: "Corporate Videos",
    description: "Corporate video solutions for financial institutions, including company profiles and internal communications.",
    icon: "🏛️",
    fullDescription: "Our corporate video services create professional, impactful videos specifically for financial institutions. From company profiles to internal communications, we create videos that effectively communicate your message while maintaining your professional image.",
    benefits: [
      "Professional representation of your financial institution",
      "Clear communication of complex institutional messages",
      "Consistent branding across all corporate video content",
      "Versatile use for external marketing and internal communications"
    ],
    processSteps: [
      "Goals and messaging strategy development",
      "Script and storyboard creation with corporate approval",
      "Professional filming with attention to corporate environment",
      "Editing with corporate branding integration",
      "Review, refinement, and multi-format delivery"
    ],
    imageSrc: "https://placehold.it/800x500?text=Corporate+Videos"
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId && serviceDetails[serviceId as keyof typeof serviceDetails];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Service Not Found</h1>
          <p className="mb-6">The service you are looking for does not exist.</p>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/services" className="inline-flex items-center text-money-teal hover:text-money-green mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Services
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-5xl mb-6 block">{service.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{service.fullDescription}</p>

            <h2 className="text-2xl font-bold mb-4">Benefits</h2>
            <ul className="list-disc list-inside mb-8 space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700">{benefit}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4">Our Process</h2>
            <ol className="relative border-l border-gray-200 ml-3 mb-8">
              {service.processSteps.map((step, index) => (
                <li key={index} className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-money-teal rounded-full -left-3 ring-8 ring-white">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </li>
              ))}
            </ol>

            <Link to="/contact">
              <Button className="btn-gradient px-8 py-3 mt-4">
                Request this Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div>
            <div className="sticky top-24">
              <img 
                src={service.imageSrc} 
                alt={service.title} 
                className="w-full h-auto rounded-lg shadow-lg mb-8"
              />
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-gray-700 mb-6">Contact us today to discuss your {service.title.toLowerCase()} needs and how we can help your financial brand communicate more effectively.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="flex-1">
                    <Button className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                  <Link to="/portfolio" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Similar Work
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-center">Other Services You Might Need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(serviceDetails)
              .filter(([id]) => id !== serviceId)
              .slice(0, 3)
              .map(([id, otherService]) => (
                <Link to={`/services/${id}`} key={id} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="p-6">
                      <div className="text-3xl mb-3">{otherService.icon}</div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-money-green transition-colors">{otherService.title}</h3>
                      <p className="text-gray-600 text-sm">{otherService.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
