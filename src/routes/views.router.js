import { Router } from "express";
const router = Router(); 

import ProductManager from "../managers/product-manager.js"
const manager = new ProductManager("./src/data/products.json")

// Ruta de prodcutos

router.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    
    res.render("home", {products});
})

router.get("/realtimeproducts", ( req, res ) => {
    res.render("realtimeproducts")
})

export default router