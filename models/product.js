import mongoose from "mongoose";

const productSchema = mongoose.Schema({
   
   
    key:{
        unique: true,
        type: String,
        required: true,
      
       
    },
    
    name: {
        type: String,
        required: true,
    },
    price:{ 
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
        default:"uncategorized",
    },
    dimensions:{
        type: String,
        required: true,
    },
    image:{

        type: [String],
        required: true,
        default: ["https://via.placeholder.com/150"]
    },
    description:{
        type: String,
        required: true,
    },
    availability:{
        type: Boolean,
        required: true,
        default: true,
    }

    

})

 

const Product = mongoose.model("Product", productSchema);
    export default Product;