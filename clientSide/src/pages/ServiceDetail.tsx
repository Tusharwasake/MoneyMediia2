import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getServiceById } from "@/api/services.api"; // Import the API function

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

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the API function to fetch the service details
        const response = await getServiceById(serviceId!);

        setService(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || !service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Service Not Found</h1>
          <p className="mb-6">
            {error || "The service you are looking for does not exist."}
          </p>
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
        <Link
          to="/services"
          className="inline-flex items-center text-money-teal hover:text-money-green mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Services
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-5xl mb-6 block">{service.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {service.fullDescription}
            </p>
            <h2 className="text-2xl font-bold mb-4">Benefits</h2>

            {Array.isArray(service.benefits) && service.benefits.length > 0 ? (
              <ul className="list-disc list-inside mb-8 space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700">
                    {benefit}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No benefits available for this service.
              </p>
            )}
            <h2 className="text-2xl font-bold mb-4">Our Process</h2>
            {Array.isArray(service.processSteps) &&
            service.processSteps.length > 0 ? (
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
            ) : (
              <p className="text-gray-500">
                No process steps available for this service.
              </p>
            )}
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
                <h3 className="text-xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-700 mb-6">
                  Contact us today to discuss your {service.title.toLowerCase()}{" "}
                  needs and how we can help your financial brand communicate
                  more effectively.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="flex-1">
                    <Button className="w-full">Contact Us</Button>
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
      </div>
    </Layout>
  );
};

export default ServiceDetail;
