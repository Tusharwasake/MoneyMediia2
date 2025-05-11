import { useEffect, useState } from "react";
import { getClients } from "@/api/clientAPI";
import axios from "axios";

type Client = {
  _id: string;
  name: string;
  logo: string;
};

const ClientMarquee = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await getClients();
        setClients(res.data);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h3 className="text-center text-lg text-gray-500 mb-8">
          Trusted by leading financial institutions
        </h3>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-12 items-center">
                {clients?.map((client) => (
                  <div
                    key={`${i}-${client._id}`}
                    className="flex-shrink-0 h-16 w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
