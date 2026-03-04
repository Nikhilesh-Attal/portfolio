// backend/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // This means a project MUST have a title
  },
  description: { 
    type: String, 
    required: true 
  },
  shortDescription: { 
    type: String 
  },
  image: { 
    type: String, // This will store your ImageKit URL
    required: true 
  },
  liveUrl: { 
    type: String 
  },
  githubUrl: { 
    type: String 
  },
  // Notice the brackets [] - this tells MongoDB it's an array of strings!
  tags: [{ type: String }], 
  techStack: [{ type: String }],
  screenshots: [{ type: String }],
  caseStudy: [{ type: String }],
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