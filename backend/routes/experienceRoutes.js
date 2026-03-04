import express from 'express';
import { getExperience, createExperience, deleteExperience, updateExperience, } from '../controllers/experienceController.js';

const router = express.Router();

router.route('/')
    .get(getExperience)
    .post(createExperience);

router.route('/:id')
    .put(updateExperience)
    .delete(deleteExperience);

export default router;