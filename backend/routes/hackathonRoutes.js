import express from 'express';
import { getHackathons, createHackathon, updateHackathon, deleteHackathon } from '../controllers/hackathonController.js';

const router = express.Router();

router.route('/')
    .get(getHackathons)
    .post(createHackathon);

router.route('/:id')
    .put(updateHackathon)
    .delete(deleteHackathon);

export default router;