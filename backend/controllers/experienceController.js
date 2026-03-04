import Experience from "../models/ExperienceModel.js";

export const getExperience = async (req, res) => {
    try{
        const experiences = await Experience.find().sort({createdAt:-1});
        res.status(200).json(experiences);
    }catch(error){
        console.error("Error in controller : ", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const createExperience = async (req, res) => {
    try{
        const newExperience = await Experience.create(req.body);
        res.status(201).json(newExperience);
    }catch(error){
        console.error("Error in controller : ", error);
        res.status(400).json({
            message: "Server error"
        });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true,
                runValidators: true }
        )    

        if(!updateExperience){
            return res.status(404).json({
                message: "Experience not found"
            })
        }

        res.status(200).json(updatedExperience);
    } catch (error) {
        console.error("Error in controller : ", error);
        res.status(400).json({
            message: "Server error"
        });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const deletedExperience = await Experience.findByIdAndDelete(
            req.params.id
        );

        if(!deletedExperience){
            return req.status(404).json({
                message: "Experience not found"
            })
        }

        res.status(200).json({
            message: "Experience deleted successfully"
        });
    } catch (error) {
        console.error("Error in controller : ", error);
        res.status(400).json({
            message: "Server error"
        });
    }
}