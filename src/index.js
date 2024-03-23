//LEVANTAR EL SERVIDOR CON nodemon src/index.js

import express from 'express';
import ProductManager from './classes/productManagerClass.js';

const app = express();

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Servidor online en puerto ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de productos!');
});


const manager = new ProductManager();


const productos = [
    {
        title: "Laptop",
        description: "High performance laptop.",
        price: 1000,
        thumbnail: "imagen/laptop.jpg",
        code: "LP100",
        stock: 10
    },
    {
        title: "mesa",
        description: "High performance mesa.",
        price: 1000,
        thumbnail: "imagendemesa.png",
        code: "LP40",
        stock: 10
    },
    {
        title: "silla",
        description: "High performance silla.",
        price: 1000,
        thumbnail: "imagendesilla.png",
        code: "LP30",
        stock: 10
    },
    {
        title: "bowl",
        description: "High performance bowl.",
        price: 1000,
        thumbnail: "imagendebowl.png",
        code: "LP55",
        stock: 10
    },
    {
        title: "pava electrica",
        description: "duradera pava electrica.",
        price: 1000,
        thumbnail: "imagendepavaelectrica.png",
        code: "LP800",
        stock: 10
    }
];

productos.forEach(producto => manager.addProduct(producto));

// Endpoint para agregar un nuevo producto
app.post('/productos', (req, res) => {
    try {
        const newProduct = req.body;
        const product = manager.addProduct(newProduct);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
    const products = manager.getProducts();
    res.json(products);
});

// Endpoint para obtener un producto por su ID
app.get('/productos/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = manager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.get('/productos', (req, res) => {
    let products = manager.getProducts();
    const limit = req.query.limit;
    if (limit) {
        products = products.slice(0, parseInt(limit));
    }
    res.json(products);
});

// Ruta para obtener un producto por su ID
app.get('/productos/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = manager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Endpoint para actualizar un producto
app.put('/productos/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const updatedProduct = manager.updateProduct(productId, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Endpoint para eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        manager.deleteProduct(productId);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


