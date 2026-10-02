const db = require('../database/db');

async function getAllProducts() {
    return await db.readDatabase();
}

async function getProductById(id) {
    const products = await db.readDatabase();
    const numericId = Number(id);
    return products.find(product => product.id === numericId);
}

async function createProduct(productData) {
    const products = await db.readDatabase();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await db.writeDatabase(products);
    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await db.readDatabase();
    const numericId = Number(id);
    const index = products.findIndex(product => product.id === numericId);
    if (index === -1) return null;

    const updatedProduct = { id: numericId, ...productData };
    products[index] = updatedProduct;
    await db.writeDatabase(products);
    return updatedProduct;
}

async function patchProduct(id, productData) {
    const products = await db.readDatabase();
    const numericId = Number(id);
    const index = products.findIndex(product => product.id === numericId);
    if (index === -1) return null;

    const updatedProduct = { ...products[index], ...productData, id: numericId };
    products[index] = updatedProduct;
    await db.writeDatabase(products);
    return updatedProduct;
}

async function deleteProduct(id) {
    const products = await db.readDatabase();
    const numericId = Number(id);
    const index = products.findIndex(product => product.id === numericId);
    if (index === -1) return false;

    products.splice(index, 1);
    await db.writeDatabase(products);
    return true;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
