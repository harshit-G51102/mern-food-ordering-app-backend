import {Request,Response} from "express";
import Restaurant from "../models/restaurants";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


const createMyRestaurant=async(req:Request,res:Response)=>{
    try {
       const existingRestaurant=await Restaurant.findOne({user:req.userId});
       if(existingRestaurant){
        res.status(409).json({messgae:"restaurant already exist"});
       }
       const uploadResponse=await uploadImage(req.file as Express.Multer.File);
       const restaurant=new Restaurant(req.body);
       restaurant.imageUrl=uploadResponse;
       restaurant.user=new mongoose.Types.ObjectId(req.userId);
       restaurant.lastUpdated=new Date;
       await restaurant.save();
       res.status(201).send(restaurant);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error creating Restaurant"})
    }
}

const getMyRestaurant=async(req:Request,res:Response)=>{
    try {
        const restaurant=await Restaurant.findOne({user:req.userId});
        if(!restaurant){
            return res.status(404).json({message:"restaurant not found"});
        }
        res.json(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error getting Restaurant"})
    }
    
}

const updateMyrestaurant=async(req:Request,res:Response)=>{
    try {
        const restaurant=await Restaurant.findOne({user:req.userId});
        if(!restaurant){
            return res.status(404).json({message:"restaurant not found"});
        }
        restaurant.restaurantName=req.body.restaurantName;
        restaurant.city=req.body.city;
        restaurant.country=req.body.country;
        restaurant.deliveryPrice=req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime=req.body.estimatedDeliveryTime
        restaurant.cuisines=req.body.cuisines;
        restaurant.menuItems=req.body.menuItems
        restaurant.lastUpdated=new Date;
        if(req.file){
            const uploadResponse=await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl=uploadResponse;
        }
        await restaurant.save();
        res.status(200).send(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error updating Restaurant"})
    }
}

const uploadImage=async(file:Express.Multer.File)=>{
    const image=file
    const base64Image=Buffer.from(image.buffer).toString("base64");
    const dataURI=`data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse=await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
}

export default {getMyRestaurant,createMyRestaurant,updateMyrestaurant};


