const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

async function readDatabase() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Database read error:', error);
        throw error;
    }
}

async function writeDatabase(data) {
    try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Database write error:', error);
        throw error;
    }
}

module.exports = {
    readDatabase,
    writeDatabase
};
