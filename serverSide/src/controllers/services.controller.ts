import { Request, Response } from "express";
import { Service } from "../models/services.model";

// CREATE a new service
export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, title, description } = req.body;
    const existing = await Service.findOne({ id });
    if (existing) {
      res.status(400).json({ message: "Service ID already exists" });
      return;
    }

    const service = new Service({ id, title, description });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to create service", error });
  }
};

// READ all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error });
  }
};

// READ a single service by id
export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const service = await Service.findOne({ id });
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service", error });
  }
};

// UPDATE a service
export const updateService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const service = await Service.findOneAndUpdate(
      { id },
      { title, description },
      { new: true }
    );
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to update service", error });
  }
};

// DELETE a service
export const deleteService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await Service.findOneAndDelete({ id });
    if (!result) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service", error });
  }
};
