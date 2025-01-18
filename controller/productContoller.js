import Product from "../models/product.js";


export function addProduct(req, res) {

     if(req.user== null){
        res.status(401).json({
            message: "please login and try again"
        });
        return;
     }
    if(req.user.role != "admin"){
        res.status(403).json({
            message: "you are not allowed to add products"
        });
        return; 
    }


    const productData = req.body;
    const newProduct = new Product(productData);
    newProduct.save().then(
        () => {
            res.status(200).json("Product added successfully");
        }
    ).catch(
        (err) => {
            res.status(500).json("cannot added product: " + err);
        }
    );
}


export function getProducts(req,res){

    Product.find().then(
        (products)=>{
            res.status(200).json(products);
        }
    ).catch(
        (err)=>{
            res.status(500).json("cannot get products: " + err);
        }
    )
}
 