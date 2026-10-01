import fs from "fs/promises";
import path from "path";

const filePath = path.join(import.meta.dirname, "../db/db.json");

export const readProducts = async () => {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

export const writeProducts = async (products) => {
    await fs.writeFile(filePath, JSON.stringify(products, null, 4));
};
