// src/api/contact.api.ts
import api from "./axios";

export interface ContactFormData {
  name: string;
  email: string;
  companyName?: string;
  serviceOfInterest?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const submitContactForm = (formData: ContactFormData) => {
  return api.post<ContactResponse>("/contactus", formData);
};

export default {
  submitContactForm,
};
