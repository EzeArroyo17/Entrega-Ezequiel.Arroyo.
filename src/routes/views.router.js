import { Router } from "express";
const router = Router(); 

import ProductManager from "../dao/db/product-manager-db.js"
const manager = new ProductManager();

router.get("/products", async (req, res) => {
    const products = await manager.getProducts(); 

    res.render("home", {products});
})

router.get("/realtimeproducts", ( req, res ) => {
    res.render("realtimeproducts")
})

export default router