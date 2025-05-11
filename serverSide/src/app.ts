import express from "express";
import clientRouter from "./routes/client.route";
import authRouter from "./routes/auth.routes";
import serviceRouter from "./routes/services.routes";
import subscribeToNewsletterRouter from "./routes/newsletter.route";
import testimonialRoutes from "./routes/testimonials.routes";
import { globalErrorHandler } from "./middlewares/errorHandler";
import portfolioRouter from "./routes/portfolio.routes";
import contactRouter from "./routes/contact.routes";

import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://moneymedia1.netlify.app",
];

interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => void;
  methods: string[];
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};

// Apply CORS before any other middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.use("/auth", authRouter);
app.use("/clients", clientRouter);
app.use("/services", serviceRouter);
app.use("/testimonials", testimonialRoutes);
app.use("/newsletter", subscribeToNewsletterRouter);
app.use("/portfolio", portfolioRouter);
app.use("/contactus", contactRouter);

app.use(globalErrorHandler);
export default app;
