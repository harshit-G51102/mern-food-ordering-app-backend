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