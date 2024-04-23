// user document in the mongodb database 

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


// Helpful for frontend when filling in the form as all fields have been defined with types.
export type UserType = {
    _id: string;
    email: string; 
    password: string;
    firstName: string;
    lastName: string;

};

// User schema for mongoDB
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    firstName: {type: String, required: true },
    lastName: {type: String, required: true }
});

//middleware for mongoDB, making sure before any updates to the document, GET SAVED and check if the password has been modified 

UserSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        // if the pass has been modified we call brcypt to hash it and call next function
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

const User = mongoose.model<UserType>('User', UserSchema);

export default User;