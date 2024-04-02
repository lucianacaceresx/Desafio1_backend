import { Router } from 'express';
import { CartManager } from '../cartManager.js';

const cartsRouter = Router();

//creamos un carrito en localhost:8080/api/carts/

cartsRouter.post(`/`, async (req, res) => {
    try {
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error) {
        res.send(`Error al crear el carrito`)
    }

})

cartsRouter.get(`/:cid`, async (req, res) => {
    const { cid } = req.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send(`Error al intentar enviar los productos del carrito`)
    }
})

cartsRouter.post(`/:cid/products/:pid`, async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductsToCart(cid, pid)
        res.send(`Producto agregado exitosamente`)
    } catch (error) {
        res.send(`Error en intentar guardar producto en el carrito`)
    }
})

export {cartsRouter}