import { useEffect, useState } from "react";
import { getClients } from "@/api/clientAPI";
import {
  Shield,
  Award,
  CheckCircle,
  Star,
  Sparkles,
  Building,
} from "lucide-react";

type Client = {
  _id: string;
  name: string;
  logo: string;
};

const ClientMarquee = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const res = await getClients();
        setClients(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching clients", error);
        setError("Unable to load client logos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Fallback clients if API fails
  const fallbackClients = [
    {
      _id: "1",
      name: "Groww",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Groww_app_logo.png",
    },
    {
      _id: "2",
      name: "Angel One",
      logo: "https://static.vecteezy.com/system/resources/previews/022/100/573/original/angel-one-logo-transparent-free-png.png",
    },
    {
      _id: "3",
      name: "HDFC Sky",
      logo: "https://companieslogo.com/img/orig/HDFCBANK.NS-dc56d93d.png",
    },
    {
      _id: "4",
      name: "Edelweiss",
      logo: "https://companieslogo.com/img/orig/EDEL.NS-af77af1c.png",
    },
    {
      _id: "5",
      name: "ICICI Prudential",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/ICICI_Prudential_Life_logo.svg/2560px-ICICI_Prudential_Life_logo.svg.png",
    },
    {
      _id: "6",
      name: "Paytm",
      logo: "https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.png",
    },
  ];

  // Use clients from API or fallback if error or empty
  const displayClients = clients.length > 0 ? clients : fallbackClients;

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-green-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal-400/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-4">
            <Building className="h-4 w-4" />
            <span className="text-sm font-medium">Our Clients</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
            Trusted by Leading Financial Institutions
          </h2>

          <p className="text-gray-600">
            We're proud to work with some of the most reputable names in the
            financial industry, helping them communicate complex topics with
            clarity and impact.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Stats above marquee */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-sm text-gray-500">Clients Served</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">15+</div>
                <div className="text-sm text-gray-500">Industries</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  200+
                </div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm text-gray-500">Satisfaction Rate</div>
              </div>
            </div>

            {/* Client logos marquee with enhanced design */}
            <div className="relative overflow-hidden">
              {/* Gradient fades at edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-50 to-transparent"></div>

              <div className="mx-auto max-w-5xl">
                <div className="flex animate-marquee whitespace-nowrap py-8">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex space-x-16 items-center mx-8">
                      {displayClients?.map((client) => (
                        <div
                          key={`${i}-${client._id}`}
                          className="flex-shrink-0 h-16 w-40 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        >
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/160x64/f3f4f6/94a3b8?text=" +
                                client.name;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial highlight */}
            <div className="mt-16 max-w-3xl mx-auto text-center">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-green-400 mx-auto mb-4 opacity-70" />
                <blockquote className="text-lg md:text-xl text-gray-600 italic mb-6">
                  "The Money Mediia team has transformed how we communicate
                  complex financial products. Their expertise in making
                  difficult concepts accessible has significantly improved our
                  customer engagement."
                </blockquote>
                <cite className="font-medium text-gray-900 not-italic block">
                  Vishal Mehta
                </cite>
                <span className="text-sm text-gray-500">
                  Independent Algorithmic trader, Former Global Director for CMT
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        @media (prefers-reduced-motion) {
          .animate-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientMarquee;
