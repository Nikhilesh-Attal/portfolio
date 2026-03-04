import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';

const router = express.Router();

router.route('/')
    .get(getSkills)
    .post(createSkill);

router.route('/:id')
    .put(updateSkill)
    .delete(deleteSkill);

export default router;