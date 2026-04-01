import express from 'express';
import { getReview, createReview, updateReview, deleteReview, getAllReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const reviewLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max : 2, // limit each IP to 3 review submissions per windowMs
    message: {
        message: "Too many review submitted from this IP."
    }
})
router.route('/')
    .get(getReview)
    .post(reviewLimiter, createReview);

//private routes for admin
router.route('/all')
    .get(protect, getAllReviews);
    
router.route('/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

export default router;