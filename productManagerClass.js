class ProductManager {
    
    constructor() {
        this.products = [];
        this.nextId = 1 ;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("All fields are required.");
            return;
        }
        if (this.products.some(product => product.code === code)) {
            console.error("Product code must be unique.");
            return;
        }
        const newProduct = {
            id: this.nextId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        console.log(`Product added successfully with id ${newProduct.id}`);
        // "`" esta comilla es option y }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Not found");
            return;
        }
        return product;
    }
}

module.exports = ProductManager;