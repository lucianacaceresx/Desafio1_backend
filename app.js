const http = require(`http`); // aca estoy importando el modulo http de Node.js
const listadoProductos = require(`./products.json`)
const PORT = 3001; //Aca estoy definiendo el puerto

const server = http.createServer((req,res)=>{ 
    //creamos un servidor con el metodo createServer del modulo http
    //req: toda la info que nos llegue desde el cliente y resp: toda la informacion que le devolveremos al cliente
   
    console.log(req.url) //aca voy a ver que url me esta pidiendo el cliente en esa solicitud http

    if(req.url === "/productos"){ //si mi url es : "/productos" hacer...
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
        res.end(JSON.stringify(listadoProductos)) //Aca hago un JSON.stringify porque el metodo .end solo recibe cadena de texto tipo string
        return;
    }


    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
    //el metodo .writeHead permite configurar encabezados, como 1er arg: un codigo (200) que indica el estado de la rta
    // y como segundo arg : un content type para personalizar el encabezado con tipo de contenido/longitud etc
    res.end("Server básico con http de node!! ekeko") //utilizo el metodo .end para enviar la respuesta

    
})

server.listen(PORT, ()=>{ //Acá estoy haciendo que el servidor ESCUCHE una peticion y pasando una fn callback que devuelve el mensaje
    console.log(`Server online en puerto ${PORT}`)
})