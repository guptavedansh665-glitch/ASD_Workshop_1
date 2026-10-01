import express from "express";
import {
    getAllProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct
} from "../controllers/productController.js";
import validateProductPayload, { validateProductUpdatePayload } from "../middleware/productTypeChecker.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", validateProductPayload, addProduct);
router.get("/products/:id", getProduct);
router.patch("/products/:id", validateProductUpdatePayload, editProduct);
router.delete("/products/:id", removeProduct);

export default router;