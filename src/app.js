//LEVANTAR EL SERVIDOR CON nodemon src/index.js

import express from 'express';
import ProductManager from './classes/productManagerClass.js';

const app = express();
const PORT = 3003;

const productManager = new ProductManager();


// Ruta  para la consigna del endpoint limit
app.get('/productos', (req, res) => {
    let products = productManager.getProducts();
    const limit = req.query.limit;
    if (limit) {
        products = products.slice(0, parseInt(limit));
    }
    res.json(products);
});

//ruta p la consigna del endpoint pid
app.get('/productos/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor online en puerto ${PORT}`);
});


// respuesta p ruta no encontrada
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// rta si el servidor no anda
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor online en puerto ${PORT}`);
});
