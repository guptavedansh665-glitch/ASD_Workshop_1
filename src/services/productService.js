import { readProducts, writeProducts } from "../database/productDatabase.js";

const productCache = {};

const delay = async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return readProducts();
};

export const getProducts = async () => {
    const cacheKey = "/products";

    if (productCache[cacheKey]) {
        return productCache[cacheKey];
    }

    const allProducts = await delay();
    productCache[cacheKey] = allProducts;
    return allProducts;
};

export const getProductById = async (id) => {
    const cacheKey = `/products/${id}`;

    if (productCache[cacheKey]) {
        return productCache[cacheKey];
    }

    const allProducts = await delay();
    const foundProduct = allProducts.filter((item) => String(item.id) === String(id));
    productCache[cacheKey] = foundProduct;
    return foundProduct;
};

export const createProduct = async (product) => {
    const allProducts = await readProducts();
    allProducts.push(product);
    await writeProducts(allProducts);

    for (const key in productCache) {
        delete productCache[key];
    }

    return product;
};

export const patchProduct = async (id, product) => {
    const allProducts = await readProducts();
    const productIndex = allProducts.findIndex((item) => String(item.id) === String(id));

    if (productIndex === -1) {
        return null;
    }

    allProducts[productIndex] = { ...allProducts[productIndex], ...product };
    await writeProducts(allProducts);

    for (const key in productCache) {
        delete productCache[key];
    }

    return allProducts[productIndex];
};

export const deleteProduct = async (id) => {
    const allProducts = await readProducts();
    const productIndex = allProducts.findIndex((item) => String(item.id) === String(id));

    if (productIndex === -1) {
        return null;
    }

    const deletedProduct = allProducts.splice(productIndex, 1)[0];
    await writeProducts(allProducts);

    for (const key in productCache) {
        delete productCache[key];
    }

    return deletedProduct;
};
