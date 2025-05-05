import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  blogId: mongoose.Types.ObjectId;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  parentComment?: mongoose.Types.ObjectId;
  approved: boolean;
  likes: number;
  replies: number;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      avatar: String,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    approved: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    replies: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
commentSchema.index({ blogId: 1, approved: 1 });
commentSchema.index({ parentComment: 1 });

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
