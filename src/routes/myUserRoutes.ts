import myUserController from "../controllers/myUserController";
import express from "express";
import {jwtCheck, jwtParse} from "../middleware/auth";
import { validateMyUser } from "../middleware/validation";

const router=express.Router();
router.get('/',jwtCheck,jwtParse,myUserController.getCurrentUser);
router.post('/',jwtCheck,myUserController.createCurrentUser);
router.put('/',jwtCheck,jwtParse,validateMyUser,myUserController.updateCurrentUser);


export default router;
 
