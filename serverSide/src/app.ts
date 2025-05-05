import express from "express";
import clientRouter from "./routes/client.route";
import authRouter from "./routes/auth.routes";
import serviceRouter from "./routes/services.routes";
import subscribeToNewsletterRouter from "./routes/newsletter.route";
import testimonialRoutes from "./routes/testimonials.routes";
import { globalErrorHandler } from "./middlewares/errorHandler";

import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"], // your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS before any other middleware
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/clients", clientRouter);
app.use("/services", serviceRouter);
app.use("/testimonials", testimonialRoutes);
app.use("/newsletter", subscribeToNewsletterRouter);

app.use(globalErrorHandler);
export default app;
