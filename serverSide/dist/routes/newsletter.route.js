"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/newsletter.ts
const express_1 = __importDefault(require("express"));
const newsletter_controller_1 = require("../controllers/newsletter.controller");
const subscribeToNewsletterRouter = express_1.default.Router();
subscribeToNewsletterRouter.post("/", newsletter_controller_1.subscribeToNewsletter);
exports.default = subscribeToNewsletterRouter;
