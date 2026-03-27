import express from 'express';
import { getReview, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.route('/')
    .get(getReview)
    .post(createReview);

router.route('/:id')
    .put(updateReview)
    .delete(deleteReview);

export default router;