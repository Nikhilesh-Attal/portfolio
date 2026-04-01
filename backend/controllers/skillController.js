import Skill from "../models/SkillModel.js";

export const getSkills = async (req, res) => {
    try{
        const skills = await Skill.find().sort({createdAt: -1});
        res.status(200).json(skills);
    }catch(error){
        console.log("Error in controller : ", error);
        res.status(500).json({
            message: "Server Error"
        })
    }
};

export const createSkill = async (req, res) => {
    try {
        const newSkill = await Skill.create(req.body);
        res.status(201).json(newSkill);
    } catch (error) {
        console.error("Error in controller: ",error);
        res.status(400).json({ 
            message: "Server Error" 
        });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if(!updatedSkill){
            return res.status(404).json({
                message: "Skill not found"
            })
        }

        res.status(200).json(updatedSkill)
    } catch (error) {
        console.error("Error in controller: ",error);
        res.status(400).json({ 
            message: "Server Error" 
        });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const deletedSkill = await Skill.findByIdAndDelete(
            req.params.id
        )

        if(!deletedSkill){
            return res.status(404).json({
                message: "Skill not found"
            })
        }

        res.status(200).json({
            message: "Skill deleted successfully : ", 
            deletedSkill
        })
    } catch (error) {
        console.error("Error in controller: ", error);
        res.status(500).json({
            message: "Server Error"
        });
    }
}