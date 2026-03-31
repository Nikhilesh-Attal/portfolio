import express from 'express';
import { getExperience, createExperience, deleteExperience, updateExperience, } from '../controllers/experienceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getExperience)
    .post(protect, createExperience);

router.route('/:id')
    .put(protect, updateExperience)
    .delete(protect, deleteExperience);

export default router;