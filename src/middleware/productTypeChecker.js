const validateProductPayload = (req, res, next) => {
    const { id, name, price } = req.body;

    if (typeof id !== "number" || typeof name !== "string" || typeof price !== "number") {
        return res.status(400).json({
            error: "Product details must include a valid id, name, and price."
        });
    }

    next();
};

export const validateProductUpdatePayload = (req, res, next) => {
    const { name, price } = req.body;

    if (name === undefined && price === undefined) {
        return res.status(400).json({
            error: "Please provide a name or price to update the product."
        });
    }

    if (name !== undefined && typeof name !== "string") {
        return res.status(400).json({
            error: "Product name must be a string."
        });
    }

    if (price !== undefined && typeof price !== "number") {
        return res.status(400).json({
            error: "Product price must be a number."
        });
    }

    next();
};

export default validateProductPayload;