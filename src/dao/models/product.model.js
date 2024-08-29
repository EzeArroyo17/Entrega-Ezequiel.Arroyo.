import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; 

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnails:{
        type: [String]
    }
})

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("products", productSchema)

export default ProductModel