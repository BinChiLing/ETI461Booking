const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        const error = new Error("You are not authenticated!");
        error.status = 401;
        return next(error);
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err){
            const error = new Error("Token is not valid!");
            error.status = 403;
            return next(error);
        }
        req.user = user;
        next()
    });
}

const verifyUser = async (req, res, next) => {
    verifyToken(req, res, next, ()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            const error = new Error("You are not authorized!");
            error.status = 403;
            return next(error);
        }
    })
}


const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            const error = new Error("You are not authorized!");
            error.status = 403;
            return next(error);
        }
    })
}

module.exports = {verifyToken, verifyUser, verifyAdmin};
