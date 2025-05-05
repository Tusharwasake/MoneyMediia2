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
exports.subscribeToNewsletter = void 0;
const newsletter_model_1 = require("../models/newsletter.model"); // your Mongoose model
const subscribeToNewsletter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    try {
        const existing = yield newsletter_model_1.Newsletter.findOne({ email });
        if (existing) {
            res.status(409).json({ message: "Email already subscribed" });
            return;
        }
        const subscription = new newsletter_model_1.Newsletter({ email });
        yield subscription.save();
        res.status(201).json({ message: "Subscribed successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Subscription failed", error: err });
    }
});
exports.subscribeToNewsletter = subscribeToNewsletter;
