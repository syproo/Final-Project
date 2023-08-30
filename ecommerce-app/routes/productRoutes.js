import express from "express";
import formidable from "express-formidable"
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewareJWT.js";
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";

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

//Get product count
router.get("/product-count", productCountController);

// Get products per page
router.get("/product-list/:page", productListController);

// Get products by Category
router.get("/product-category/:slug", productCategoryController);

//search product
router.get("/search/:keyword", searchProductController);

//Similar Product
router.get("/related-product/:pid/:cid", relatedProductController)

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
export default router;
