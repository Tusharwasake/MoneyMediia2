// routes/newsletter.ts
import express from "express";
import { subscribeToNewsletter } from "../controllers/newsletter.controller";
const subscribeToNewsletterRouter = express.Router();

subscribeToNewsletterRouter.post("/", subscribeToNewsletter);

export default subscribeToNewsletterRouter;
