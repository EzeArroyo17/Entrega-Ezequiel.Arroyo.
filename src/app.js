const PUERTO = 8080;

import express from "express"
const app = express();

app.use(express.json())


import productsRouter from "./routes/products.Router.js";
import cartsRouter from "./managers/cart-manager.js";

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(PUERTO, () => {
    console.log("Escuchando desde localHost:8080 <(:P ");
})