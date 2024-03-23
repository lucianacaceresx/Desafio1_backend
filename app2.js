const express = require(`express`); //Aca importo express
const listadoProductosJSON = require(`./products.json`);
const ProductManager = require("./productManagerClass");

const PORT = 3000; //Aca determino el puerto

const app2 = express(); //Aca estoy asignando a la instancia de express

app2.get("/", (req, resp) => { //Aca estoy diciendo que a app.2 de url ("/") y le mando una funcion de callback con un console.log

    resp.send("Server con express")
    //En express a diferencia de http es .send en vez de .end como metodo para enviar una rta
    //con express no hace falta dar instruccion de tipo de dato: se configura automaticamente
})

app2.get("/productos/", (req, resp) => {
    const productosManagerInstance = new ProductManager();
    const productos = productosManagerInstance.getProducts()
    resp.send("Listado de productos: " + JSON.stringify(productos));
})

app2.get("/productos/:id", (req, resp) => {
    let id = req.params.id;
    console.log(id, typeof id);
    id = Number(id);
    if (isNaN(id)) { //isNaN =  is not a number
        return resp.json({ error: " Ingrese un valor numerico" });
    }

    const productos = new ProductManager()
    const producto = productos.getProductById(id)
    if (producto) {
        resp.json(producto)
    } else {
        resp.json(`No existe producto con id: ${id}`)
    }
})

app2.listen(PORT, () => { //Aca estoy haciendo que el servidor ESCUCHE la peticion del cliente
    console.log(`Esto es express, server online en puerto ${PORT}`)
})

//snippet :clg y enter = me arma el console.log()

//como crear snippets? view > command palette > snippets: configuracion de user snipet 
//> new global snippets file > comentar el scope >