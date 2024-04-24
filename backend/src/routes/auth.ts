import express, {Request, Response} from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();
const {check, validationResult} = require('express-validator');

router.post('/login', [ 
    check('email', "Email is required").isEmail(),
    //check( 'password', "password with 6 or more character required").isLength({min : 6}),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    // Collect email and password from the body 
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email}) 

        // if cant find a user with that email then return error
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // check if the password is a match
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // SYNTAX ->  jwt.sign( additional detail we want to store, JWT KEY, Expiration deadline for the token)
        //also can be extracted to a different file since it has been used twice
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string,{expiresIn: '1d', } );

        res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge:86400000 });

        // user._id is how its comes from mongoDB
        // convenience for front end just in case they need to do something with the user id since they dont have access to the token       
         res.status(200).json({userId: user._id})


    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
})

export default router;