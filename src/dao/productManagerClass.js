import * as fs from 'fs';
import path from "path";
import { URL } from 'node:url'; // in Browser, the URL in native accessible on window

const __dirname = new URL('.', import.meta.url).pathname;

export default class ProductManager {
    constructor(filename = 'products.json') {
        this.filePath = path.join(__dirname, filename);
        this.initFile();
        console.log ("este es el dirname:" + __dirname)
    }
    initFile() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
        console.log("esto es el dirname" + __dirname)
    }
    readProducts() {
        const data = fs.readFileSync(this.filePath);
        return JSON.parse(data);
    }
    writeProducts(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const products = await this.readProducts();
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }
        if (products.some(product => product.code === code)) {
            console.error("El codigo debe ser unico");
            return;
        }
        let id;
        if (products.length === 0) {
            id = 1; // Si no hay productos, el ID inicial será 1
        } else {
            id = products.reduce((max, obj) => obj.id > max ? obj.id : max, -Infinity) + 1;
        }
        
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        products.push(newProduct);
        console.log(`Producto añadido exitosamente con el ID: ${newProduct.id}`);
        // "`" esta comilla es option y }
        this.writeProducts(products);
    }

// crear los productos en el json, que mi productManagerClass.js me haga las funciones desde ese arreglo NO POR SEPARADO y ahi llamar la clase desde el app.js

    async getProductById(id) {
        const products = await this.readProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            console.error("Not found");
            return;
        }
        return product;
    }
    async updateProduct(id, newProduct) {
        let products = await this.readProducts();
        let productoActualizado = null;
        products = products.map(product => {
            if (product.id === id) {
                const { title, description, price, thumbnail, code, stock } = newProduct;
                productoActualizado = {
                    id,
                    title: title || product.title,
                    description: description || product.description,
                    price: price || product.price,
                    thumbnail: thumbnail || product.thumbnail,
                    code: code || product.code,
                    stock: stock || product.stock
                };
                console.log("El producto se ha actualizado:", productoActualizado);
                return productoActualizado;
            }
            return product;
        });
        this.writeProducts(products);
        return productoActualizado;
    }
    async deleteProduct(id) {
        let products = await this.readProducts();
        products = products.filter(product => {
            if (product.id === id) {
                return false;
            } else {
                return true;
            }
        })
        this.writeProducts(products);
    }
    getProducts() {
        return this.readProducts();
    }
}
