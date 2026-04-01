import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: true
    },

    reviewerEmail: {
        type: String,
        required: true
    },

    reviewerTitle: {
        type: String,
        required: true
    },

    reviewText: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    displayOrder: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    isApproved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export default mongoose.model('Review', reviewSchema);