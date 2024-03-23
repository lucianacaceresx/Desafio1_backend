//LEVANTAR EL SERVIDOR CON nodemon src/index.js

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.");
        }
        if (this.products.some(product => product.code === code)) {
            throw new Error("El código debe ser único");
        }

        const id = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        console.log(`Producto añadido exitosamente con el ID: ${newProduct.id}`);
        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    updateProduct(id, newProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }

        const updatedProduct = {
            id,
            title: newProduct.title || this.products[index].title,
            description: newProduct.description || this.products[index].description,
            price: newProduct.price || this.products[index].price,
            thumbnail: newProduct.thumbnail || this.products[index].thumbnail,
            code: newProduct.code || this.products[index].code,
            stock: newProduct.stock || this.products[index].stock
        };
        this.products[index] = updatedProduct;
        console.log("El producto se ha actualizado:", updatedProduct);
        return updatedProduct;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error("No se encontro el producto");
        }
        this.products.splice(index, 1);
        console.log(`Producto con ID ${id} eliminado correctamente`);
    }

    getProducts() {
        return this.products;
    }
}

export default ProductManager;
