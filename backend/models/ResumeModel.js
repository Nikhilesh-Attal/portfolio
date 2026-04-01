import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  resumeUrl: {
    type: String,
    required: true, 
  },
  fileId: {
    type: String, // Store this so we can delete the old PDF later!
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Resume', resumeSchema);