import {
    getProducts,
    getProductById,
    createProduct,
    patchProduct,
    deleteProduct
} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await getProducts();
        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json({ error: "Unable to fetch products right now." });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);

        if (!product || product.length === 0) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: "Unable to fetch this product right now." });
    }
};

export const addProduct = async (req, res) => {
    try {
        const newProduct = await createProduct(req.body);
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: "Unable to add the product. Please try again." });
    }
};

export const editProduct = async (req, res) => {
    try {
        const updatedProduct = await patchProduct(req.params.id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ error: "Unable to update the product. Please try again." });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json(deletedProduct);
    } catch (error) {
        return res.status(500).json({ error: "Unable to delete the product. Please try again." });
    }
};