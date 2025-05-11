"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_route_1 = __importDefault(require("./routes/client.route"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const services_routes_1 = __importDefault(require("./routes/services.routes"));
const newsletter_route_1 = __importDefault(require("./routes/newsletter.route"));
const testimonials_routes_1 = __importDefault(require("./routes/testimonials.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const portfolio_routes_1 = __importDefault(require("./routes/portfolio.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://moneymedia1.netlify.app",
];
const corsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
};
// Apply CORS before any other middleware
app.use((0, cors_1.default)());
// Body parsing middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});
app.use("/auth", auth_routes_1.default);
app.use("/clients", client_route_1.default);
app.use("/services", services_routes_1.default);
app.use("/testimonials", testimonials_routes_1.default);
app.use("/newsletter", newsletter_route_1.default);
app.use("/portfolio", portfolio_routes_1.default);
app.use("/contactus", contact_routes_1.default);
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
