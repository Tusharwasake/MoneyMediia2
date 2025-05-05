import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://moneymediia2.onrender.com",
});

// GET request for clients
export const getClients = () => {
  return api.get("/clients");
};
