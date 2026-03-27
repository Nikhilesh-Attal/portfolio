import express from 'express';
import { getResume, uploadResume } from '../controllers/resumeController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route: get the current resume
router.get('/', getResume);

//this route does use authentication middleware, but we will add that later when we implement user authentication
router.post('/upload', upload.single('resumeFile'), uploadResume);

// Protected Admin route: Upload/Update the resume "resumeFile" is the name of the field in your frontend form
//router.post('/upload', upload.single('resumeFile'), auth, resumeController.uploadResume);

export default router;