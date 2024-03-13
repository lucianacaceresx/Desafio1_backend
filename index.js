const ProductManager = require ("./productManagerClass")


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

const listaDeProductos = manager.getProducts();
console.log(listaDeProductos);

const producto1 = manager.getProductById(3);
console.log(producto1);