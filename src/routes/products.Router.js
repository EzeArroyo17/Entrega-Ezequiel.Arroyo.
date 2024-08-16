import { Router } from "express";
const router = Router(); 
import ProductManager from "../managers/product-manager.js"
const manager = new ProductManager("./src/data/products.json")


router.get("/", async (req, res) => {
    const arrayProducts = await manager.getProducts()
    res.send(arrayProducts)
})

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;

    try{
        const product = await manager.getProductById(parseInt(id))

        if (!product) {
            res.send("Producto no encontrado");
        } else {
            return res.send("product");
        }
    } catch (error){
        res.send ("El ID solicitado no corresponde a ningun producto en catalogo")
    }


})


router.post("/", (req, res) => {
    const newProduct = req.body;

    pets.push(newProduct);
    res.send({ status: "success", message: "Producto agregado correctamente" });
})


router.put("/", (req, res) => { 
    const { id } = req.params;
    const { title,
        description,
        price,
        stock,
        category,
        status,
        thumbnails } = req.body;

    let productIndex = products.findIndex(product => product.id === id);

    if (productIndexIndex !== -1) {

        products[productIndex].title = title;
        products[productIndex].description = description;
        products[productIndex].price = price;
        products[productIndex].stock = stock;
        products[productIndex].category = category;
        products[productIndex].status = status;
        products[productIndex].thumbnails = thumbnails;

        res.send({ status: "success", message: "Prodcuto actualizado correctamente" });
    } else {
        res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }
})

router.delete("/", (req, res) => {
    const { id } = req.params; 
    
    let productIndex = products.findIndex(product => product.id === id); 

    if (productIndex !== -1) {

        clientes.splice(productIndex, 1);
        console.log(products);

        res.send({status: "success", message: "Prodcuto eliminado correctamente"});
    } else {
        res.status(404).send({status: "error", message: "Producto no encontrado"}); 
    }
})

export default router