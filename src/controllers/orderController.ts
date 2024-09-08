import { Request, Response } from "express";
import Restaurant from "../models/restaurants";
import { menuItemType } from "../models/restaurants";
import Order from "../models/order";
import User from "../models/user";

type checkoutSessionRequest={
    cartItems:{
        menuItemId:string,
        name:string,
        quantity:string
    }[];
    deliverydetails:{
        email:string, 
        name:string,
        addressLine:string,
        city:string
    };
    restaurantId:string

}

const getMyOrder=async(req:Request,res:Response)=>{
    try {
        const order=await Order.find({user:req.userId}).populate("restaurant").populate("user").lean();
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error getting order details"})
    }
}


const createCheckoutSession=async(req:Request,res:Response)=>{
    try {
        const checkoutSessionRequest:checkoutSessionRequest=req.body;
        const restaurant=await Restaurant.findById(checkoutSessionRequest.restaurantId);
        if(!restaurant){
            throw new Error("restaurant not found");
        }
        const {lineItems,totalPrice}=createLineItems(checkoutSessionRequest,restaurant.menuItems);
        const newOrder=new Order({
            restaurant:restaurant,
            user:req.userId,
            status:"paid",
            deliveryDetails:checkoutSessionRequest.deliverydetails,
            cartItems:checkoutSessionRequest.cartItems,
            createdAt:new Date(),
            totalAmount:totalPrice+restaurant.deliveryPrice,
        })
        await newOrder.save();
        res.json({lineItems,deliveryDetails:checkoutSessionRequest.deliverydetails});
    } catch (error:any) {
        console.log(error);
        res.status(500).json({message:error.raw.message})
    }
}

const createLineItems=(checkoutSessionRequest:checkoutSessionRequest,menuItems:menuItemType[])=>{
    let totalPrice = 0;
    const lineItems=checkoutSessionRequest.cartItems.map((cartItem)=>{
    const menuItem=menuItems.find((item)=>item._id.toString()===cartItem.menuItemId.toString());
    if(!menuItem){
        throw new Error("menu item does not exist");
    }

    const itemPrice = menuItem.price * parseInt(cartItem.quantity, 10); // Calculate price for the current item
    totalPrice += itemPrice; // Add to total price

    const lineItem={
        name:menuItem.name,
        price:menuItem.price,
        amount:cartItem.quantity
    }
    return lineItem;
   })
   return {lineItems,totalPrice};
}

export default {createCheckoutSession,getMyOrder};