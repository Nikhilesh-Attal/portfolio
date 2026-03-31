import express from 'express';
import { getHackathons, createHackathon, updateHackathon, deleteHackathon } from '../controllers/hackathonController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getHackathons)
    .post(protect, createHackathon);

router.route('/:id')
    .put(protect, updateHackathon)
    .delete(protect, deleteHackathon);

export default router;