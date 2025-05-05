// import { Schema, model, Document } from "mongoose";

// export interface IService extends Document {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
// }

// const ServiceSchema = new Schema<IService>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     icon: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Service = model<IService>("Service", ServiceSchema);

import { Schema, model, Document } from "mongoose";

export interface IService extends Document {
  id: string;
  title: string;
  description: string;
  icon: string;
  fullDescription: string;
  benefits: string[];
  processSteps: string[];
  imageSrc: string;
}

const ServiceSchema = new Schema<IService>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      required: true,
    },
    processSteps: {
      type: [String],
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model<IService>("Service", ServiceSchema);
