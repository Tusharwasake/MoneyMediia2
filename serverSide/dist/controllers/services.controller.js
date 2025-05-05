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
exports.deleteService = exports.updateService = exports.getServiceById = exports.getAllServices = exports.createService = void 0;
const services_model_1 = require("../models/services.model");
// CREATE a new service
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, description } = req.body;
        const existing = yield services_model_1.Service.findOne({ id });
        if (existing) {
            res.status(400).json({ message: "Service ID already exists" });
            return;
        }
        const service = new services_model_1.Service({ id, title, description });
        yield service.save();
        res.status(201).json(service);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create service", error });
    }
});
exports.createService = createService;
// READ all services
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield services_model_1.Service.find();
        res.status(200).json(services);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch services", error });
    }
});
exports.getAllServices = getAllServices;
// READ a single service by id
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = yield services_model_1.Service.findOne({ id });
        if (!service) {
            res.status(404).json({ message: "Service not found" });
            return;
        }
        res.status(200).json(service);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch service", error });
    }
});
exports.getServiceById = getServiceById;
// UPDATE a service
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const service = yield services_model_1.Service.findOneAndUpdate({ id }, { title, description }, { new: true });
        if (!service) {
            res.status(404).json({ message: "Service not found" });
            return;
        }
        res.status(200).json(service);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update service", error });
    }
});
exports.updateService = updateService;
// DELETE a service
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield services_model_1.Service.findOneAndDelete({ id });
        if (!result) {
            res.status(404).json({ message: "Service not found" });
            return;
        }
        res.status(200).json({ message: "Service deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete service", error });
    }
});
exports.deleteService = deleteService;
