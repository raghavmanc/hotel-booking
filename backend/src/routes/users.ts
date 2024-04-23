import express, {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/register', async(req:Request, res:Response) => {

    try{
        // checking if a user already exists with the email provided 
        let user = await User.findOne({
            email: req.body.email,
        });

        // If user exists return status 400
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        // otherwise create new user and save
        user = new User(req.body)
        await user.save()

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1d',
        })

        res.cookie("auth_token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        })

        res.sendStatus(200);

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Something went wrong'})
    }
});

export default router;
