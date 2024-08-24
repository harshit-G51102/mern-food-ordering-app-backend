import express from "express";
import {jwtCheck, jwtParse} from "../middleware/auth";
import multer from "multer";
import myRestaurantController from "../controllers/myRestaurantController";
import { validateMyRestaurant } from "../middleware/validation";

const router=express.Router();

const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024, //5mb
    }
})

// /api/my/restaurant
router.post('/',upload.single("imageFile"),validateMyRestaurant,jwtCheck,jwtParse,myRestaurantController.createMyRestaurant);
router.get('/',jwtCheck,jwtParse,myRestaurantController.getMyRestaurant);
router.put('/',upload.single("imageFile"),validateMyRestaurant,jwtCheck,jwtParse,myRestaurantController.updateMyrestaurant);

export default router;
