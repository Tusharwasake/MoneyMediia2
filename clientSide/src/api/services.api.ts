import api from "./axios";

// GET all services
export const getAllServices = () => {
  return api.get("/services");
};

// GET a single service by ID
export const getServiceById = (id) => {
  return api.get(`/services/${id}`);
};

// CREATE a new service (admin only)
export const createService = (serviceData) => {
  return api.post("/services", serviceData);
};

// UPDATE a service (admin only)
export const updateService = (id, serviceData) => {
  return api.put(`/services/${id}`, serviceData);
};

// DELETE a service (admin only)
export const deleteService = (id) => {
  return api.delete(`/services/${id}`);
};
