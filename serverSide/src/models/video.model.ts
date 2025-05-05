// models/video.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number; // in seconds
  category: string;
  tags: string[];
  client?: {
    name: string;
    company: string;
    logo?: string;
  };
  projectDetails?: {
    projectType: string;
    industry: string;
    completionDate: Date;
    teamSize?: number;
    role: string;
  };
  credits?: {
    director?: string;
    producer?: string;
    cinematographer?: string;
    editor?: string;
    scriptWriter?: string;
    voiceOver?: string;
    music?: string;
  };
  equipment?: {
    camera?: string[];
    lenses?: string[];
    software?: string[];
  };
  statistics: {
    views: number;
    likes: number;
    shares: number;
  };
  published: boolean;
  featured: boolean;
  awards?: string[];
  platforms: {
    youtube?: {
      videoId: string;
      url: string;
    };
    vimeo?: {
      videoId: string;
      url: string;
    };
    other?: {
      platform: string;
      url: string;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    client: {
      name: String,
      company: String,
      logo: String,
    },
    projectDetails: {
      projectType: String,
      industry: String,
      completionDate: Date,
      teamSize: Number,
      role: String,
    },
    credits: {
      director: String,
      producer: String,
      cinematographer: String,
      editor: String,
      scriptWriter: String,
      voiceOver: String,
      music: String,
    },
    equipment: {
      camera: [String],
      lenses: [String],
      software: [String],
    },
    statistics: {
      views: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
    },
    published: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    awards: [String],
    platforms: {
      youtube: {
        videoId: String,
        url: String,
      },
      vimeo: {
        videoId: String,
        url: String,
      },
      other: [
        {
          platform: String,
          url: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
videoSchema.index({ slug: 1 });
videoSchema.index({ category: 1 });
videoSchema.index({ tags: 1 });
videoSchema.index({ published: 1, featured: -1, createdAt: -1 });
videoSchema.index({ "client.company": 1 });

// Pre-save middleware to generate slug
videoSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

export const Video = mongoose.model<IVideo>("Video", videoSchema);
