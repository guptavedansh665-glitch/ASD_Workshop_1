


const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

const cache = {};

const pathTOfile = path.join(__dirname, "db.json");

async function readFile() {
    try {
        let data = await fs.readFile(pathTOfile, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function readFileWithDelay() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    let products = await readFile();
    return products;
}


app.get('/products', async (req, res) => {

    try {
        let key =req.url;
        let value=cache[key];
        if (value){
            return res.json(value)
        }
        let products = await readFileWithDelay();
        cache[key] = products;
        console.log("Data from file");

        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});


app.get('/products/:id', async (req, res) => {
    try {
        let products = await readFile();

        let { id } = req.params;
        id = Number(id);

        let product = products.find((item) => {
            return item.id == id;
        });

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

