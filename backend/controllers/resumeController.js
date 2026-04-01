import imageKit from '../config/imagekit.js';
import Resume from '../models/ResumeModel.js';

export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne().sort({ lastUpdated: -1 });
        if (!resume) {
            return res.status(404).json({ message: "No resume found" });
        }
        res.status(200).json(resume);
    } catch (error) {
        console.error("Error in controller: ", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const uploadResume = async (req, res) => {
    try {
        
        //1. check if multer catch the file
        if(!req.file){
            return res.status(400).json({
                message: "No file is found"
            });
        }

        // 2. pass the raw file in buffer to imagekit
        const uploadResume = await imageKit.upload({
            file: req.file.buffer, // the raw file
            fileName: `resume-${Date.now()}.pdf`, // give a unique name to the file
            folder: "/portfolio/resume" // set folder name in imagekit
        });

        // uploadResume now has the url and fileId
        
        // 3. pass the imageKit data to schema
        const newResume = new Resume({
            resumeUrl: uploadResume.url,
            fileId: uploadResume.fileId,
            lastUpdated: new Date()
        });

        // 4. save to mongoDB
        await newResume.save();

        res.status(200).json({
            message: "Resume uploaded successfully",
            data: newResume
        });
    } catch (error) {
        console.error("Error in controller: ", error);
        res.status(500).json({
            message: "Server error"
        });        
    }
}