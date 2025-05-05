// import client1 from "@/assets/clientsLogo/ShareIndiaLogo.png";
// import client2 from "@/assets/clientsLogo/Angel_One_Logo.svg.png";
// import client3 from "@/assets/clientsLogo/Utrade_logo.jpg";
// import client4 from "@/assets/clientsLogo/sensibull.jpg";
// import client5 from "@/assets/clientsLogo/Groww_app_logo.png";
// import client6 from "@/assets/clientsLogo/FYERS-LOGO-1-1-2048x622.webp";
// import client7 from "@/assets/clientsLogo/edelweiss-mutual-fund.jpg";
// import client8 from "@/assets/clientsLogo/Paytm_Money_Logo.png";

// const logos = [
//   {
//     id: 1,
//     name: "Client 1",
//     logo: client1,
//   },
//   {
//     id: 2,
//     name: "Client 2",
//     logo: client2,
//   },
//   {
//     id: 3,
//     name: "Client 3",
//     logo: client3,
//   },
//   {
//     id: 4,
//     name: "Client 4",
//     logo: client4,
//   },
//   {
//     id: 5,
//     name: "Client 5",
//     logo: client5,
//   },
//   {
//     id: 6,
//     name: "Client 6",
//     logo: client6,
//   },
//   {
//     id: 7,
//     name: "Client 7",
//     logo: client7,
//   },
//   {
//     id: 8,
//     name: "Client 8",
//     logo: client8,
//   },
// ];

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
