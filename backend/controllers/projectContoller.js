import Project from '../models/ProjectModel.js'; 

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    // .find({}) gets everything. .sort({ createdAt: -1 }) puts the newest projects first
    const projects = await Project.find({}).sort({ createdAt: -1 }); 
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin only - we will add auth later)
export const createProject = async (req, res) => {
  try {
    // .create() takes the JSON sent from the frontend (req.body) and saves it
    const newProject = await Project.create(req.body);
    
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid project data', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, // The ID from the URL
      req.body,      // The new data to update
      { new: true, runValidators: true } // 'new: true' sends back the updated version, not the old one
    );

    // If no project matched that ID, let the frontend know
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Project not found or invalid data', error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Project not found', error: error.message });
  }
};