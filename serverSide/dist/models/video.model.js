"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
// models/video.model.ts
const mongoose_1 = __importStar(require("mongoose"));
const videoSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
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
exports.Video = mongoose_1.default.model("Video", videoSchema);
