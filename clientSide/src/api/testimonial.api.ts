import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://moneymediia-1.onrender.com",
});

// GET request for all testimonials
export const getAllTestimonials = () => {
  return api.get("/testimonials");
};

// GET request for featured testimonials
export const getFeaturedTestimonials = (limit: number = 5) => {
  return api.get(`/testimonials/featured?limit=${limit}`);
};

// GET request for specific testimonial
export const getTestimonialById = (id: string) => {
  return api.get(`/testimonials/${id}`);
};

// POST request to create testimonial (admin only)
export const createTestimonial = (data) => {
  return api.post("/testimonials", data);
};

// PUT request to update testimonial (admin only)
export const updateTestimonial = (id, data) => {
  return api.put(`/testimonials/${id}`, data);
};

// DELETE request to remove testimonial (admin only)
export const deleteTestimonial = (id) => {
  return api.delete(`/testimonials/${id}`);
};
