import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    let token;

    //check if the authorization header exists and start with "Bearer"
    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //attach the decoded user data to the request so the next function can use it
            req.user = decoded;

            //move on to actual route controller
            next();
        } catch (error) {
            console.log("Error in auth middleware:", error);
            res.status(401).json({
                message: "Not authorized, token failed"
            });   
        }
    }
    if(!token){
        res.status(401).json({
            message: "Not authorized, no token"
        });
    }
};