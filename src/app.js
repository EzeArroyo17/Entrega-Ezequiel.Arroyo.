import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
const app = express();
const PUERTO = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/view");


app.get("/", (req, res) => {
    res.render("home");
})

import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


//Socket.io

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
});


const io = new Server(httpServer);

import ProductManager from "./managers/product-manager.js"
const manager = new ProductManager("./src/data/products.json")



io.on("connection", async (socket) => {
    console.log("Un cliente se conecto conmigo");

    socket.emit("product", await manager.getProducts());

    socket.on("deleteProduct", async (id) =>{
        await manager.deleteProduct(id)

        io.sockets.emit("product", await manager.getProducts())
    })

})