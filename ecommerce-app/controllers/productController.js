import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
    try {
        //Product Model Destructuring
        const { name, description, price, quantity, category, shipping, slug } =
            req.fields;
        const { photo } = req.files;

        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo is required & should be less than 1MB" });
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Creating Product",
            error,
        });
    }
};


//Get All Products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products,

        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Fetching Product",
            error,
        })
    };
};

//Get Single Product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Fetching Single Product",
            error,
        })
    }
}


//Get Product Photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Fetching Product Photo",
            error,
        })
    }
}


//Product Delete COntroller

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Deleting Product",
            error,
        })
    }
}


//Product Update COntroller

export const updateProductController = async (req, res) => {
    try {
        //Product Model Destructuring
        const { name, description, price, quantity, category, shipping, slug } =
            req.fields;
        const { photo } = req.files;

        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo is required & should be less than 1MB" });
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updating Product",
            error,
        });
    }
}

