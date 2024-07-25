
import fs from 'fs/promises';


class CartManager {
    constructor(path) {
        this.path = path;
        this.cart = [];
        this.ultId = 0;

        //Cargar carritos almacenados en el archivo:
        this.cargarCarritos()
    }

    // Metodos auxiliares para cargar y leer archivos
    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data)

            if (this.carts.length > 0) {
                //Verifico que exista un elemento
                this.ultId = Math.max(...this.carts.map(cart => cart.id)) //Map retorna un nuevo array
                //Uso el metodo map para crear un nuevo array que solo tenga los id del carrito y con math.max obtengo el mayor
            }

        } catch (error) {
            console.log("Error al cargar los ID", error);

            // Si no existe el archivo lo creo
            await this.guardarCarritos()
        }

    }
    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    }

    // Crear el carrito:

    async crearCarrito (){
        const nuevoCarrito = {
            id : ++this.ultId,
            products: []
        }
        this.carts.push(nuevoCarrito);

        // Guarda el array en el archivo:
        await this.guardarCarritos();
        return nuevoCarrito;
    }

    // Retorne el carrito por id:
    
    async getCarritoPorId(carritoId){
        try{
            const carrito = this.cart.find(c => c.id === carritoId)
            if (!carrito) { 
                throw new Error("No existe un carrito con ese id")
            }
        }catch (error) {

        }
    }

    //Agregar productos al carrito

    async agregarProductosAlCarrito (carritoId, productoId, quantity = 1){
        const carrito = await this.getCarritoPorId(carritoId);
        const existeProducto = carrito.products.find(p => p.product === productoId)
        
        // Verifico si existe el producto
        if (existeProducto) {
            existeProducto.quantity += quantity;
        }else{
            carrito.products.push ({product: productoId, quantity});
        }
        
        await this.guardarCarritos();
        return carrito
    }

}





export default CartManager;