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
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"], // your frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200,
};
// Apply CORS before any other middleware
app.use((0, cors_1.default)(corsOptions));
// Body parsing middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", auth_routes_1.default);
app.use("/clients", client_route_1.default);
app.use("/services", services_routes_1.default);
app.use("/testimonials", testimonials_routes_1.default);
app.use("/newsletter", newsletter_route_1.default);
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
