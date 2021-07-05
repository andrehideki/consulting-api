const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class JSONDatabaseManager {

    async read() {
        try {
            let content = await readFile("db.json");
            return JSON.parse(String(content));
        } catch (error) {
            console.error(error);
        }
    }

    async save(database) {
        try {
            await writeFile("db.json", database);
        } catch (error) {
            console.error(error);
        }
    }

    async reset() {
        try {
            await writeFile("db.json", JSON.stringify(JSON.parse(await readFile("dbBKP.json")), null, "\t"));
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = JSONDatabaseManager;