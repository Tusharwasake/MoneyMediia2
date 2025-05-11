"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/contactRoutes.ts
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("../controllers/contact.controller");
const contactRouter = express_1.default.Router();
contactRouter.post("/", contact_controller_1.submitContact);
exports.default = contactRouter;
