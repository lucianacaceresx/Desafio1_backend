class ProductManager {

    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }
        if (this.products.some(product => product.code === code)) {
            console.error("El codigo debe ser unico");
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
        console.log(`Producto añadido exitosamente con el ID: ${newProduct.id}`);
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
// aca en el updateProduct modifique agregando una variable null a productoActualizado 
// para que este metodo me retorne el valor actualizado
    updateProduct(id, newProduct) {
        let productoActualizado = null;
        this.products = this.products.map(product => {
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
        return productoActualizado;
    }


    deleteProduct(id) {
        this.products = this.products.filter(product => {
            if (product.id === id) {
                return false;
            } else {
                return true;
            }
        })

    }
}


module.exports = ProductManager;