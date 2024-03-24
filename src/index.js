//LEVANTAR EL SERVIDOR CON nodemon src/index.js

import ProductManager from './classes/productManagerClass.js';

const manager = new ProductManager();


manager.addProduct({
    title: "Laptop",
    description: "High performance laptop.",
    price: 1000,
    thumbnail: "imagen/laptop.jpg",
    code: "LP100",
    stock: 10
});
manager.addProduct({
    title: "mesa",
    description: "High performance mesa.",
    price: 1000,
    thumbnail: "imagendemesa.png",
    code: "LP40",
    stock: 10
});
manager.addProduct({
    title: "silla",
    description: "High performance silla.",
    price: 1000,
    thumbnail: "imagendesilla.png",
    code: "LP30",
    stock: 10
});
manager.addProduct({
    title: "bowl",
    description: "High performance bowl.",
    price: 1000,
    thumbnail: "imagendebowl.png",
    code: "LP55",
    stock: 10
});
manager.addProduct({
    title: "pava electrica",
    description: "duradera pava electrica.",
    price: 1000,
    thumbnail: "imagendepavaelectrica.png",
    code: "LP800",
    stock: 10
});
// Obtener la lista de productos 
console.log("Esta es la lista completa de productos:");
const listaDeProductos = manager.getProducts();
listaDeProductos.forEach(producto => {
    console.log(producto);
});

// fs.writeFile('productos.json', JSON.stringify(listaActualizada, null, 2), (err) => {
//     if (err) throw err;
//     console.log('La lista de productos se ha guardado correctamente en el archivo productos.json');
// });

//  mostramos el producto a actualizar
console.log("Producto a actualizar:", manager.getProductById(4));

manager.updateProduct(4, {
    title: "horno",
    description: "horno electrico.",
    price: 900
});
// Aca elimino el producto y pido mostrar la lista actualizada
manager.deleteProduct(2);
console.log("Esta es la lista completa de productos con el producto 2 eliminado y el 4 modificado:");
console.log(manager.getProducts());
