import express from "express";
import formidable from "express-formidable"
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewareJWT.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";

//Object Router
const router = express.Router();

//Routing

//Create Product-Method POST
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

//-Get All Products
router.get("/get-product", getProductController);

//-Get Single Products
router.get("/single-product/:slug", getSingleProductController);

//-Get Photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete("/product/:pid", deleteProductController);

//Update Product-Method PUT
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);





export default router;
