import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectContoller.js';
import { protect } from "../middleware/auth.js"

const router = express.Router();

// The base URL '/api/projects' is already set in index.js
// So '/' here actually means '/api/projects'

  router.route('/')
  .get(getProjects)     // Public: Anyone can see projects
  //.post(createProject); // Private: Only you can add projects
  .post(protect, createProject); // Private Admin route: Only you can add projects
  
  router.route('/:id')
  //.put(updateProject)   // Private: Only you can edit a project
  .put(protect, updateProject) // Private Admin route: Only you can edit a project

  //.delete(deleteProject); // Private: Only you can delete a project
  .delete(protect, deleteProject) // Private Admin route: Only you can delete a project
export default router;