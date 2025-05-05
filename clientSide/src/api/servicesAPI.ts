import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://moneymediia-1.onrender.com",
});

// GET request for clients
export const getAllServices = () => {
  return api.get("/services");
};

// newsletter.ts

export const subscribeNewsletter = async (email: string) => {
  try {
    const response = await api.post("/newsletter", { email });
    return response;
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Error details:", error.code, error.message);
      console.error("Request config:", error.config);
    }
    throw error;
  }
};
