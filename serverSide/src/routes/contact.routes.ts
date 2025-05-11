// src/routes/contactRoutes.ts
import express from "express";
import { submitContact } from "../controllers/contact.controller";

const contactRouter = express.Router();

contactRouter.post("/", submitContact);

export default contactRouter;
