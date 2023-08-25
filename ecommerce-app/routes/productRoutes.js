import express from "express";
import formidable from "express-formidable"
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewareJWT.js";
import { createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productFiltersController, 
    productPhotoController, 
    relatedProductController, 
    searchProductController, 
    updateProductController
 } from "../controllers/productController.js";

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
router.delete("/delete-product/:pid", deleteProductController);

//Update Product-Method PUT
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

//-Get Products By Filter
router.post("/product-filters", productFiltersController);

//search product
router.get("/search/:keyword", searchProductController);


//Similar Product
router.get("/related-product/:pid/:cid", relatedProductController)

export default router;
