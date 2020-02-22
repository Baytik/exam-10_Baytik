const fs = require('fs');
const nanoid = require('nanoid');

const readFile = filename => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    });
};

const writeFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, err => {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    })
};

const filename = './db.json';

let data = [];

module.exports = {
    async init() {
        try {
            const fileContents = await readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async getItemById() {
        return data;
    },
    async addItem(item) {
        item.id = nanoid();
        if (item.title === '' || item.description === '') {
            return data
        } else {
        data.push(item);
        await this.save();
        }
    },
    async deleteItem(item) {
        let index;
        data.map((obj) => {
            if (item === obj.id) {
                index = data.indexOf(obj);
                data.splice(index, 1);
            }
        });
        await this.save();
    },
    async save() {
        const fileContents = JSON.stringify(data, null, 2);
        await writeFile(filename, fileContents);
    }
};