import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewareJWT.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategory,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category controller
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category
router.get("/get-category", categoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

//single category
router.get("/single-category/:slug", singleCategory);

export default router;
