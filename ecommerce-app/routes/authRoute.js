import express from "express";
import { registerController } from "../controllers/authController.js";
import {
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewareJWT.js";

//Object Router
const router = express.Router();

//Routing

//Register-Method POST
router.post("/register", registerController);

//LOGIN-Method POST
router.post("/login", loginController);

//Test Route
router.get("/test", requireSignIn, isAdmin, testController);

//Protected Route for Dashboard -Method Get
router.get("/user-auth", requireSignIn,(req,res)=>{
  res.status(200).send({ok:true})
});

export default router;
