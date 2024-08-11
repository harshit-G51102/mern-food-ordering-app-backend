import {Request,Response} from "express"
import User from "../models/user";

const createCurrentUser=async(req:Request,res:Response)=>{
    try {
        const {auth0id}=req.body;
        const exsitingUser= await User.findOne({auth0id});
        if(exsitingUser){
            return res.status(200).send();
        }
        const newUser=new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error creating user"})
    }
}

const updateCurrentUser=async(req:Request,res:Response)=>{
    try { 
        const {name,addressLine,country,city}=req.body;
        const exsitingUser=await User.findById(req.userId);
        if(!exsitingUser){
            return res.status(404).json({message:"user not found"});
        }
        exsitingUser.name=name;
        exsitingUser.addressLine=addressLine;
        exsitingUser.city=city;
        exsitingUser.country=country;

        await exsitingUser.save();
        res.send(exsitingUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error updating user"})
    }
}

const getCurrentUser=async(req:Request,res:Response)=>{
    try { 
        const currentUser=await User.findById({_id:req.userId});
        if(!currentUser){
            return res.status(404).json({message:"user not found"});
        }
        res.json(currentUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error getting profile"})
    }
}

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
}