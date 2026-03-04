import Hackathon from "../models/HackathonModel.js";

export const getHackathons = async (req, res) => {
    try{
        const hackathons = await Hackathon.find().sort({createdAt: -1});
        res.status(200).json(hackathons);
    } catch(error){
        console.error("Error in controller: ",error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const createHackathon = async (req, res) => {
    try{
        const newHackatthon = await Hackathon.create(req.body);
        res.status(201).json(newHackatthon);
    }catch(error){
        console.error("Error in controller: ",error);
        res.status(400).json({ message: "Server Error" });    
    }
};

export const updateHackathon = async (req, res) => {
    try {
        const updatedHackathon = await Hackathon.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        )

        if(!updatedHackathon){
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }

        res.status(200).json(updatedHackathon);
    } catch (error) {
        console.error("Error in controller: ",error);
        res.status(400).json({ message: "Server Error" });
    }
};

export const deleteHackathon = async (req, res) => {
    try{
        const deletedHackathon = await Hackathon.findByIdAndDelete(req.params.id);

        if(!deletedHackathon){
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }
        
        res.status(200).json({message: "Hackathon deleted successfully"});
    } catch(error){
        console.error("Error in controller: ",error);
        res.status(400).json({ message: "Server Error" });
    }
}