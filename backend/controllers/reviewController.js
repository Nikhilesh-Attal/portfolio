import Review from '../models/ReviewModel.js';

export const getReview = async (req, res) => {
    try {
        const reviews = (await Review.find()).sort({ createdAt: -1})
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error in controller: ",error);
        res.status(500).json({ 
            message: "Server Error" 
        });
    }
};

export const createReview = async (req, res) => {
    try{
        const newReview = await Review.create(req.body);
        res.status(201).json(newReview);
    } catch (error){
        console.error("Error in controller: ",error);
        res.status(400).json({ 
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
                message: "Review not found",
                updatedReview
            })
        }

        res.status(200).json(updatedReview);
    }catch(error){
        console.error("Error in controller: ",error);
        res.status(400).json({ 
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
                message: "Review not found",
                deletedReview
            })
        }

        res.status(200).json(deletedReview);
    } catch (error) {
      console.error("Error in controller: ",error);
        res.status(400).json({ 
            message: "Server Error" 
        });      
    }
};