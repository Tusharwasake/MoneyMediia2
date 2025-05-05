import mongoose, { Document, Schema, model } from "mongoose";

// Interface for Client document
export interface IClient extends Document {
  name: string;
  logo: string;
}

// Schema definition
const clientSchema: Schema<IClient> = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
});

// Model
const Client = model<IClient>("Client", clientSchema);

export { Client };
