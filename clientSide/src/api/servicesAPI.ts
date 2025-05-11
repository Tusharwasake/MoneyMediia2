import api from "./axios";

// GET request for clients
export const getAllServices = () => {
  return api.get("/services");
};

