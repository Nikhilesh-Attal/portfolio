import AdminUser from "../models/AdminUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        //find the user by email
        const user = await AdminUser.findOne({ email});
        if(!user){
            return res.status(404).json({
                message: "Invalid email or password"
            });
        }

        //compare the provided password with the stored hash password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return res.status(404).json({
                message: "Invalid email or password"
            });
        }

        //generate a JWT token
        const token = jwt.sign({ 
            id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' });

        //send the token as a response
        res.status({
            message: "Login sucessfully",
            token: token,
         });
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({
            message: "Server error during login"
        });
    }
}