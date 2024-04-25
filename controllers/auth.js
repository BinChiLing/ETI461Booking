const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);



        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save();
        res.status(200).send("User has been created.")
    }catch(err){
        next(err);
    }
}

const login = async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username})

        if(!user){
            const error = new Error("User not found!");
            error.status = 404;
            return next(error);
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) {
            const error = new Error("Wrong password or username.");
            error.status = 400;
            return next(error);
        }
        
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails})
    }catch(err){
        next(err);
    }
}


module.exports = {
    register,
    login
};