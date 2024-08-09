import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../Models/User.js';

export const register =  async (req,res) =>{
    try{
        const {
            email,
            password, 
        } = req.body;
        console.log(req.body);
        console.log(email,password , "email and password");
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


export const login =async (req,res) =>{
    try{
        const {email,password} = req.body;
       
        const user = await User.findOne({email:email});
        if(!user){
            res.status(400).json({message:
                "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) res.status(400).json({message:"Invalid Credentials"});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({user,token});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
