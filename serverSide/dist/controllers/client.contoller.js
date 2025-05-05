"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClients = exports.createClient = exports.updateClient = exports.deleteClient = void 0;
const client_model_1 = require("../models/client.model");
// @desc    Get all clients
// @route   GET /api/clients
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield client_model_1.Client.find();
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch clients", error });
    }
});
exports.getAllClients = getAllClients;
// @desc    Create a new client
// @route   POST /api/clients
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, logo } = req.body;
        if (!name || !logo) {
            res.status(400).json({ message: "Name and logo are required" });
            return;
        }
        const client = new client_model_1.Client({ name, logo });
        const savedClient = yield client.save();
        res.status(201).json(savedClient);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create client", error });
    }
});
exports.createClient = createClient;
// @desc    Update client
// @route   PUT/PATCH /api/clients/:id
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield client_model_1.Client.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update client", error });
    }
});
exports.updateClient = updateClient;
// @desc    Delete client
// @route   DELETE /api/clients/:id
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield client_model_1.Client.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json({ message: "Client deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete client", error });
    }
});
exports.deleteClient = deleteClient;
