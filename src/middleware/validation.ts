import { body, validationResult } from "express-validator";
import { NextFunction, Request,Response } from "express";
const handleValidation=async(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array});
    }
    next();
}
export const validateMyUser=[
    body("name").isString().notEmpty().withMessage("name must be string"),
    body("addressLine").isString().notEmpty().withMessage("address line must be string"),
    body("city").isString().notEmpty().withMessage("city must be string"),
    body("country").isString().notEmpty().withMessage("country must be string"),
    handleValidation,

]

export const validateMyRestaurant=[
    body("restaurantName").notEmpty().withMessage("restaurant name is required"),
    body("city").notEmpty().withMessage("city name is required"),
    body("country").notEmpty().withMessage("country name is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("delivery price must be positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("estimatedDeliveryTime must be a positive integer"),
    body("cuisines").isArray().withMessage("cuisines must be array").not().isEmpty().withMessage("cuisines cannot be empty"),
    body("menuItems").isArray().withMessage("menuItems must be array"),
    body("menuItems.*.name").notEmpty().withMessage("name cannot be empty"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("price must be positive integer"),
    handleValidation
]

