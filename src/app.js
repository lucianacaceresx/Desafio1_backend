import express from "express";
import ProductManager from "./classes/productManagerClass.js";



const PORT = 3000; //Aca determino el puerto

const app2 = express(); //Aca estoy asignando a la instancia de express

app2.get("/", (req, resp) => { //Aca estoy diciendo que a app.2 de url ("/") y le mando una funcion de callback con un console.log

    resp.send("Server con express")
    //En express a diferencia de http es .send en vez de .end como metodo para enviar una rta
    //con express no hace falta dar instruccion de tipo de dato: se configura automaticamente
})

app2.get("/productos", (req, resp) => {
    const productosManagerInstance = new ProductManager();
    const productos = productosManagerInstance.getProducts()
    let limit = parseInt(req.query.limit);

    if (!limit) {
        resp.json(productos)
    }

    resp.json(productos.slice(0, parseInt(limit)))
})

app2.get("/productos/:pid", (req, resp) => {

    let respuesta;
    let pid = req.params.pid;
    console.log(pid, typeof pid);
    pid = Number(pid);
    if (isNaN(pid)) { //isNaN =  is not a number
        respuesta={ error: " Ingrese un valor numerico" };
    }else{
    const productos = new ProductManager()
    const producto = productos.getProductById(pid)

    if (producto) {
        respuesta = producto
    } else {
        respuesta = `No existe producto con id: ${pid}`
    }}
    resp.json(respuesta)

})

app2.listen(PORT, () => { //Aca estoy haciendo que el servidor ESCUCHE la peticion del cliente
    console.log(`Esto es express, server online en puerto ${PORT}`)
})