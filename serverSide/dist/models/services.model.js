"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    fullDescription: {
        type: String,
        required: true,
    },
    benefits: {
        type: [String],
        required: true,
    },
    processSteps: {
        type: [String],
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Service = (0, mongoose_1.model)("Service", ServiceSchema);
