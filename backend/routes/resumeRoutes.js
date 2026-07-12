import express from 'express';
import { getResume, uploadResume, deleteResume } from '../controllers/resumeController.js';
import upload from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Root Operations Base Path: /api/resume
router.route('/')
  .get(getResume) // Anyone can view the active resume
  .post(protect, upload.single('resumeFile'), uploadResume); // Protected route for raw creation

// Target-Specific Operations Path: /api/resume/:id
router.route('/:id')
  .put(protect, upload.single('resumeFile'), uploadResume) // Updates matching target record key name
  .delete(protect, deleteResume); // Wipes out cloud and DB matching targets completely

export default router;