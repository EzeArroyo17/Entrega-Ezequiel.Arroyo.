import { Router } from "express";
const router = Router();

import CartManager from "../managers/cart-manager.js"
const cartManager = new CartManager("./src/data/carts.json")


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito()
        res.json(nuevoCarrito)

    } catch (error) {
        console.log(error);
        
        res.status(500).send("Error del servidor")
    }
})


router.get("/:cid", async (req, res) => {
    let cartId = parseInt(req.params.cid);

    try {
        const cart = await cartManager.getCarritoPorId(cartId)
        if (!cart) {
            return res.status(404).send("Carrito no encontrado"); // Retorno 404 si el carrito no existe
        }
        res.json(cart);
    } catch (error) {
        res.status(500).send("Error al obtener los prodcutos del carrito")
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid);
    let productsId = req.params.pid;
    let quantity = req.body.quantity || 1;

    try {
        const updated = await cartManager.agregarProductosAlCarrito(cartId, productsId, quantity);
        res.json( updated.products)//carrito actualizado
    } catch (error) {
        console.log(error);
        
        res.status(500).send("Error al agregar un prodcuto")
    }
})




export default router