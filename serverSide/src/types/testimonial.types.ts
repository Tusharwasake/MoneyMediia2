export interface TestimonialDTO {
  content: string;
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  rating?: number;
  imageUrl?: string;
}

export interface TestimonialQuery {
  isActive?: boolean;
  rating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
