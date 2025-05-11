import mongoose, { Document } from "mongoose";

// Portfolio item interface
export interface IPortfolioItem extends Document {
  type: string;
  title: string;
  category: string;
  client?: string;
  thumbnail: string;
  videoUrl?: string;
  industry: string;

  // Video-specific fields
  duration?: string;

  // Blog-specific fields
  author?: string;
  readTime?: number;
  publishDate?: Date;
  content?: string;
  blogUrl?: string;
  excerpt?: string;

  // Common fields
  description: string;
  featured?: boolean;
  tags?: string[];

  // Virtual fields
  id?: string; // Virtual field for compatibility
  date?: string; // Virtual field for compatibility

  createdAt: Date;
  updatedAt: Date;
}

// Portfolio item schema
const portfolioItemSchema = new mongoose.Schema(
  {
    // Common fields
    type: {
      type: String,
      required: true,
      enum: ["video", "blog", "case-study", "image"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    client: {
      type: String,
      required: function (this: { type: string }) {
        return this.type !== "blog"; // Only required for non-blog items
      },
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },

    // Video-specific fields
    videoUrl: {
      type: String,
      required: function (this: { type: string }) {
        return this.type === "video";
      },
    },
    duration: {
      type: String,
      required: function (this: { type: string }) {
        return this.type === "video";
      },
    },

    // Blog-specific fields
    author: {
      type: String,
      required: function (this: { type: string }) {
        return this.type === "blog";
      },
      trim: true,
    },
    readTime: {
      type: Number,
      required: function (this: { type: string }) {
        return this.type === "blog";
      },
    },
    publishDate: {
      type: Date,
      required: function (this: { type: string }) {
        return this.type === "blog";
      },
    },
    content: {
      type: String,
      required: function (this: { type: string }) {
        return this.type === "blog";
      },
    },
    blogUrl: {
      type: String,
      required: function (this: { type: string }) {
        return this.type === "blog";
      },
      trim: true,
    },
    excerpt: {
      type: String,
      required: function (this: { type: string }) {
        return this.type === "blog";
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook to handle data transformations
portfolioItemSchema.pre("save", function (next) {
  // Convert legacy 'date' field to 'publishDate' for blog posts if needed
  if (this.type === "blog" && !this.publishDate) {
    const date = this.get("date"); // Use `get` to access virtual properties
    if (date) {
      this.publishDate = new Date(date);
    }
  }

  // Normalize type for videos if videoUrl and duration are provided
  if (this.videoUrl && this.duration && this.type !== "video") {
    this.type = "video";
  }

  next();
});

// Virtual property for compatibility with frontend expectations
portfolioItemSchema.virtual("id").get(function () {
  return this._id.toString();
});

// Virtual property to format 'publishDate' as 'date'
portfolioItemSchema.virtual("date").get(function () {
  if (this.publishDate) {
    return this.publishDate.toISOString().split("T")[0];
  }
  return undefined;
});

// Create and export the model
const PortfolioItem = mongoose.model<IPortfolioItem>(
  "PortfolioItem",
  portfolioItemSchema
);

export default PortfolioItem;
