// backend/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  category:{
    type: String,
    enum: ['Web development', 'Full Stack', 'Automation'],
    required:true
  },
  title: { 
    type: String, 
    required: true // This means a project MUST have a title
  },
  description: { 
    type: String, 
    required: true 
  },
  shortDescription: { 
    type: String,
    required: true 
  },
  images: { 
    type: [String], // Array of strings for ImageKit URLs
    required: [true, 'At least one project image is required'],
    validate: {
      validator: function(v) {
        // Ensures the array exists, has at least 1 item, and no more than 3
        return v && v.length > 0 && v.length <= 3;
      },
      message: 'You can upload a maximum of 3 images per project'
    }
  },
  liveUrl: { 
    type: String,
    required: true
  },
  githubUrl: { 
    type: String,
    required: true 
  },
  // Notice the brackets [] - this tells MongoDB it's an array of strings!
  tags: [{ type: String }], 
  techStack: [{ type: String }],
  status: { 
    type: String,
    default: 'completed' // Sets a default value if you don't provide one
  },
  displayOrder: { 
    type: Number,
    default: 0
  }
}, { 
  timestamps: true // 🪄 MAGIC: This automatically adds 'createdAt' and 'updatedAt' fields!
});

// We turn the schema into a Model and export it so we can use it in our routes
export default mongoose.model('Project', projectSchema);