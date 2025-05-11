


import api from "./axios";

// GET request for clients
export const getClients = () => {
  return api.get("/clients");
};
