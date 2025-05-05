"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
// Schema definition
const clientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
});
// Model
const Client = (0, mongoose_1.model)("Client", clientSchema);
exports.Client = Client;
