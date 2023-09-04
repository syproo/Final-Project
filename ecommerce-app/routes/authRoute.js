import express from "express";
import {
  addressInfoController,
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
  registerController,
  updateProfileController,
} from "../controllers/authController.js";
import {
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewareJWT.js";

//Object Router
const router = express.Router();

//Routing

//Register-Method POST
router.post("/register", registerController);

//LOGIN-Method POST
router.post("/login", loginController);

//Forgot Password-Method POST
router.post("/forgot-password", forgotPasswordController);

//Test Route
router.get("/test", requireSignIn, isAdmin, testController);

//Protected Route for Dashboard -Method Get
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected Route for  Admin Dashboard -Method Get
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Routes to Update User Profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// Address info
router.post("/address", requireSignIn, addressInfoController);

export default router;
