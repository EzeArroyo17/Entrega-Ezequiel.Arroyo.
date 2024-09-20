import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
const app = express();
const PUERTO = 8080;
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import ProductManager from "./dao/db/product-manager-db.js"
const manager = new ProductManager()
import ProductModel from "./dao/models/product.model.js";
import "./database.js";


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Express-Handlebars
app.engine("handlebars", engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true 
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/view");


app.get("/", async (req, res) => {
    let page = parseInt(req.query.page) || 1; 
    let limit = 8;

    try {
        const listProducts = await ProductModel.paginate({}, { limit, page });

        res.render("home", {
            products: listProducts.docs,
            hasPrevPage: listProducts.hasPrevPage,
            hasNextPage: listProducts.hasNextPage,
            prevPage: listProducts.prevPage,
            nextPage: listProducts.nextPage,
            currentPage: listProducts.page,
            totalPages: listProducts.totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener productos");
    }
});



app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


//Socket.io

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
});


const io = new Server(httpServer);



io.on("connection", async (socket) => {
    console.log("Un cliente se conecto conmigo");


    socket.emit("product", await manager.getProducts());

    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id)

        io.sockets.emit("product", await manager.getProducts())
    })

})

