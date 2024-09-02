import express from "express";
import { param } from "express-validator";
import restaurantController from "../controllers/restaurantController";

const router = express.Router();
router.get('/:restaurantId',param("restaurantId").isString().trim().notEmpty().withMessage("restaurantId parameter must be a valid string"),restaurantController.getRestaurant);
router.get('/search/:city',param("city").isString().trim().notEmpty().withMessage("city parameter must be a valid string"), restaurantController.searchRestaurant);


export default router;

