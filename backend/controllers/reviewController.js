import Review from '../models/ReviewModel.js';

// reviews to display on main page, only approved reviews will be displayed
export const getReview = async (req, res) => {
    try {
        //set indexing
        const { category, page = 1, limit =20} = req.query;

        //calculate the number of documents to skip based on the current page and limit
        const skip = (parseInt(page) - 1)* parseInt(limit);
        
        //fetch reviews from database based on the query, only approved reviews will be displayed, sorted by creation date in descending order, and paginated
        const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
        
        //count total approved reviews
        const total = await Review.countDocuments({ isApproved: true });

        // FIXED: Standardized response for frontend compatibility
        res.status(200).json({ 
            success: true, 
            count: reviews.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            data: reviews 
        });
    } catch (error) {
        console.error("Error in getReview: ", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error" 
        });
    }
};

// get reviews which are not approved by admin on admin page
export const getAllReviews = async (req, res) => {
    try {
        // FIXED: Changed .toSorted() to .sort()
        const reviews = await Review.find().sort({ createdAt: -1 });
        
        res.status(200).json({ 
            success: true, 
            count: reviews.length, 
            data: reviews 
        });
    } catch (error) {
        console.error("Error in getAllReviews: ", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error" 
        });
    }
};

export const createReview = async (req, res) => {
    try{
        const reviewData = { ...req.body, isApproved : false };
        const newReview = await Review.create(reviewData);
        
        // FIXED: Standardized response
        res.status(201).json({ 
            success: true, 
            data: newReview 
        });
    } catch (error){
        console.error("Error in createReview: ", error);
        res.status(400).json({ 
            success: false, 
            message: "Server Error" 
        });    
    }
};

export const updateReview = async (req, res) => {
    try{
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if(!updatedReview){
            return res.status(404).json({ 
                success: false, 
                message: "Review not found" 
            })
        }

        // FIXED: Standardized response
        res.status(200).json({ 
            success: true, 
            data: updatedReview 
        });
    } catch(error){
        console.error("Error in updateReview: ", error);
        res.status(400).json({ 
            success: false, 
            message: "Server Error" 
        });    
    }
};

export const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(
            req.params.id
        )

        if(!deletedReview){
            return res.status(404).json({ 
                success: false, 
                message: "Review not found" 
            })
        }

        // FIXED: Standardized response
        res.status(200).json({ 
            success: true, 
            data: deletedReview 
        });
    } catch (error) {
      console.error("Error in deleteReview: ", error);
        res.status(400).json({ 
            success: false, 
            message: "Server Error" 
        });      
    }
};