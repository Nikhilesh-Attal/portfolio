import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  
    title:{
        type: String,
        required: true
    },

    event: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    achievement: {
        type: String,
    },

    technologies: [{
        type: String,
        required: true
    }],

    links: [{
        type: String
    }],

    displayOrder: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Hackathon', hackathonSchema);