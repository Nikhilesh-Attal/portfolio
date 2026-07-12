import imageKit from '../config/imagekit.js';
import Resume from '../models/ResumeModel.js';

// @desc    Get the latest active resume
// @route   GET /api/resume
// @access  Public
export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne().sort({ lastUpdated: -1 });
        if (!resume) {
            return res.status(404).json({ message: "No resume found" });
        }
        res.status(200).json(resume);
    } catch (error) {
        console.error("Error in getResume controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Upload new resume (POST) or Update existing resume (PUT)
// @route   POST /api/resume OR PUT /api/resume/:id
// @access  Protected
export const uploadResume = async (req, res) => {
    try {
        // 1. Verify Multer successfully parsed the buffer stream
        if (!req.file) {
            return res.status(400).json({ message: "No file was found" });
        }

        // 2. Stream raw file buffer payload into ImageKit cloud bucket
        const uploadResult = await imageKit.upload({
            file: req.file.buffer, 
            fileName: `resume-${Date.now()}.pdf`, 
            folder: "/portfolio/resume" 
        });

        const targetId = req.params.id;

        // 3. UPDATE STRATEGY (PUT): Replace existing file structure
        if (targetId) {
            const oldResume = await Resume.findById(targetId);
            
            // Wipe the old file instance from ImageKit storage to prevent asset bloating
            if (oldResume && oldResume.fileId) {
                await imageKit.deleteFile(oldResume.fileId).catch(err => 
                    console.error("Failed to delete legacy file from ImageKit:", err)
                );
            }

            // Apply modifications cleanly to the existing database record instance
            const updatedResume = await Resume.findByIdAndUpdate(
                targetId,
                {
                    resumeUrl: uploadResult.url,
                    fileId: uploadResult.fileId,
                    lastUpdated: new Date()
                },
                { new: true } // Returns the newly modified record
            );

            return res.status(200).json({
                message: "Resume updated successfully",
                data: updatedResume
            });
        }

        // 4. CREATION STRATEGY (POST): Build a brand-new DB record structure
        const newResume = new Resume({
            resumeUrl: uploadResult.url,
            fileId: uploadResult.fileId,
            lastUpdated: new Date()
        });

        await newResume.save();
        res.status(200).json({
            message: "Resume uploaded successfully",
            data: newResume
        });

    } catch (error) {
        console.error("Error in uploadResume controller: ", error);
        res.status(500).json({ message: "Server error processing file upload" });        
    }
};

// @desc    Delete resume entry completely
// @route   DELETE /api/resume/:id
// @access  Protected
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume record not found in database' });
        }

        // Clear hosted asset file from your ImageKit account cloud bucket 
        if (resume.fileId) {
            await imageKit.deleteFile(resume.fileId).catch(err => 
                console.error("Failed to clear ImageKit static file asset:", err)
            );
        }

        // Clear structural document context out of MongoDB
        await Resume.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Resume removed successfully' });
    } catch (error) {
        console.error("Error in deleteResume controller: ", error);
        res.status(400).json({ message: 'Failed to complete delete sequence', error: error.message });
    }
};