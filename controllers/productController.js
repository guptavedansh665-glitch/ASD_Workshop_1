const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cacheMiddleware');

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function createProduct(req, res) {
    try {
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        invalidateCache();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.updateProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        invalidateCache();
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function patchProduct(req, res) {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.patchProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        invalidateCache();
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deleted = await productService.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
        }
        invalidateCache();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
