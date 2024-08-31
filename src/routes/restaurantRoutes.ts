import myUserController from "../controllers/myUserController";
import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUser } from "../middleware/validation";
import { param } from "express-validator";
import restaurantController from "../controllers/restaurantController";

const router = express.Router();
router.get('/search/:city', param("city").isString().trim().notEmpty().withMessage("city parameter must be a valid string"), restaurantController.searchRestaurant);


export default router;

