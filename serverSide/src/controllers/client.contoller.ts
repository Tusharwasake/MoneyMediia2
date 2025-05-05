import { Request, Response } from "express";

import { Client } from "../models/client.model";
import { promises } from "dns";

// @desc    Get all clients
// @route   GET /api/clients
const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clients", error });
  }
};

// @desc    Create a new client
// @route   POST /api/clients
const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, logo } = req.body;

    if (!name || !logo) {
      res.status(400).json({ message: "Name and logo are required" });
      return;
    }

    const client = new Client({ name, logo });
    const savedClient = await client.save();

    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ message: "Failed to create client", error });
  }
};

// @desc    Update client
// @route   PUT/PATCH /api/clients/:id
const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update client", error });
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Client.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete client", error });
  }
};

export { deleteClient, updateClient, createClient, getAllClients };
