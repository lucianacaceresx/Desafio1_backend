const ProductManager = require("./productManagerClass")


// abajo creo una instancia de la clase
const manager = new ProductManager();

console.log(manager);

manager.addProduct({ // aca estoy llamando al metodo de la instancia
    title: "Laptop",
    description: "High performance laptop.",
    price: 1000,
    thumbnail: "imagen/laptop.jpg",
    code: "LP100",
    stock: 10
});

manager.addProduct({ // aca estoy llamando al metodo de la instancia
    title: "mesa",
    description: "High performance mesa.",
    price: 1000,
    thumbnail: "imagendemesa.png",
    code: "LP40",
    stock: 10
});

manager.addProduct({ // aca estoy llamando al metodo de la instancia
    title: "silla",
    description: "High performance silla.",
    price: 1000,
    thumbnail: "imagendesilla.png",
    code: "LP30",
    stock: 10
});
manager.addProduct({ // aca estoy llamando al metodo de la instancia
    title: "bowl",
    description: "High performance bowl.",
    price: 1000,
    thumbnail: "imagendebowl.png",
    code: "LP55",
    stock: 10
});
manager.addProduct({ // aca estoy llamando al metodo de la instancia
    title: "pava electrica",
    description: "duradera pava electrica.",
    price: 1000,
    thumbnail: "imagendepavaelectrica.png",
    code: "LP40",
    stock: 10
});
const listaDeProductos = manager.getProducts();
console.log(listaDeProductos);

const producto1 = manager.getProductById(4);
console.log(" producto a actualizar: " + producto1);

manager.updateProduct(4, {
    title: "pava electrica",
    description: "duradera pava electrica.",
    price: 1000});


const productoActualizado = manager.getProductById(4)
console.log("producto actualizado: " +JSON.stringify(productoActualizado))

console.log("Esta es la lista completa de productos" + manager.getProducts())

manager.deleteProduct(4)
console.log("Esta es la lista completa de productos con el producto eliminado" + manager.getProducts())


