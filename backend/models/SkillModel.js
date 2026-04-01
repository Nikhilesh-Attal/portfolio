import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["Frontend", "Backend", "Automation", "Generative AI", "Database" ],
        required: true
    },

    name: {
        type: String,
        required: true
    },

    proficiency: {
        type: Number,
        required: true,
        default: 60,
        min: 0,   // Fixed from 'minimum'
        max: 100  // Added max limit for percentage
    },

    displayOrder: { // Fixed typo
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Skill', skillSchema);