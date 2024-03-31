import { Router} from `express`;
import UserManager from "../dao/productManagerClass.js"
export const router = Router()



// router.get(`/`, (req, resp)=>{

//     resp.setHeader(`Content-Type`, `application/json`)
//     resp.status(200).json({})
// })

app2.use(express.json());
app2.use(express.urlencoded({extended:true}))
//Ejemplo POSTMAN:

app2.get("/api/products", async(req, resp)=> {})

app2.put("/api/products", async(req, resp)=> {
    // recuperar info desde body 

})

app2.post("/api/products", async(req, resp)=> {
    //PUEDO ENVIAR DATOS VIA QUERY PARAM
    let {nombre, email} = req.body
    //Validacion
    if(!nombre || !email){
        resp.setHeader(`Content-Type`, `application/json`);
        return resp.status(400).json({error:`Complete nombre/email`})
    } //realizar el resto de validaciones
    //dentro de un try catch un metodo await ya que mi clase es asincrona
    try {
        let nuevoProducto = await ProductManager.addProduct({nombre, email})  

        resp.setHeader(`Content-Type`, `application/json`);
        return resp.status(500).json(nuevoProducto)


    } catch (error) {
        resp.setHeader(`Content-Type`, `application/json`);
        return resp.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde`,
                detalle: `${error.message}`
            }
        )
        
    }

    }//ver repo del profe que mando los snippets
)

app2.delete("/api/products", async(req, resp)=> {})

// ___________________________________________________________________


// --------------------------------------------------------------------------

// cart endpoints 



// POST /api/carrito

routerCart.post('/', async(req, res) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    body.products = [];
    const newCartId = await carrito.save(body);
    
    newCartId
        ? res.status(200).json({"sucess" : "producto añadito con ID: " + newCartId})
        : res.status(400).json({"error": "invalid key. Please verify the body content"})
    
})

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "cart successfully removed"})
        : res.status(404).json({"error": "cart not found"})
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    const {id} = req.params;
    const { body } = req;
    
    const product = await contenedor.getById(body['id']);
    
    if (product) {
        const cartExist = await carrito.addToArrayById(id, {"products": product});
        cartExist
            ? res.status(200).json({"success" : "product added"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found, verify the ID in the body content is correct."})
    }
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id)
    
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({"error": "cart not found"})
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    const productExists = await contenedor.getById(id_prod);
    if (productExists) {
        const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
        cartExists
            ? res.status(200).json({"success" : "product removed"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found"})
    }
})

const PORT = 8020;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));