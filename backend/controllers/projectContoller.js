import imageKit from '../config/imagekit.js';
import upload from '../middleware/upload.js';
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
    console.log("Error in controller : ",error)
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin only - we will add auth later)
export const createProject = async (req, res) => {
  try {
    let imageUrls = [];

    // check if image were sent in the request
    if(req.body.images && req.body.images.length > 0){
      // loop throught each images and upload each to ImageKit
      const uploadPromises = req.body.images.map((imageStr) => {
        return imageKit.upload({
          file: imageStr, //this is exactly base64 url come from frontend
        fileName: `project-${Date.now()}`,
        folder: '/portfolio/projects'
        });
      });

      //wait for all upload to finish
      const uploadResult = await Promise.all(uploadPromises);

      //extract jst the urls from the imageKit response
      imageUrls = uploadResult.map(result => result.url);
    }

    // replace the raw image data with our new ImageKit urls
    const projectData = {
      ...req.body,
      images: imageUrls
    };

    // .create() takes the JSON sent from the frontend (req.body) and saves it
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    console.log("Error in controller : ",error);
    res.status(400).json({ message: 'Invalid project data', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
  try {

    let updateData = { ...req.body };

    //if new images are being upload during an update
    if(req.body.images && req.body.images.length > 0){
      const uploadPromises = req.body.images.map((imageStr) => {
        
        //if it's already a url (meaning it wasn't changed), skip upload
        if(imageStr.startsWith('http')) return Promise.resolve({
          url: imageStr
        });

        return imageKit.upload({
          file: imageStr,
          fileName: `project-update-${Date.now()}`,
          folder: '/portfolio/projects'
        });
      });
      
      const uploadResults = await Promise.all(uploadPromises);
      updateData.images = uploadResults.map(result => result.url);
    }

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
    console.log("Error in controller : ", error);
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