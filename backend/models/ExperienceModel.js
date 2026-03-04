import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({

    role: {
        type: String,
        required: true
    },

    company:{
        type: String,
        required: true
    },

    duration: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date
        }
    },

    workType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', "Work From Home"],
        required: true
    },

    responsibilities: [{
        type: String,
        required: true
    }],

    technologies: [{
        type: String,
        required: true
    }],

    certificateUrl: [{
        type: String,
        required: true
    }],

    displayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Experience', experienceSchema);