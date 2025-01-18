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


export function getProducts(req, res) {
    let isAdmin = false;

    // Check if the user is logged in and has an admin role
    if (req.user != null && req.user.role === "admin") {
        isAdmin = true;
    }

    // Fetch products from the database
    Product.find()
        .then((products) => {
            if (isAdmin) {
                // If the user is an admin, return all products
                res.status(200).json(products);
            } else {
                // If the user is not an admin, filter by availability
                const availableProducts = products.filter(
                    (product) => product.availability === true
                );
                res.status(200).json(availableProducts);
            }
        })
        .catch((err) => {
            // Handle errors
            res.status(500).json({ message: "Cannot get products: " + err.message });
        });
}



export function updateProduct(req, res) {
    if (req.user == null) {
        res.status(401).json({ message: "Please login and try again" });
        return;
    }

    if (req.user.role !== "admin") {
        res.status(403).json({ message: "You are not allowed to update products" });
        return;
    }

    const { id } = req.params;  
    const updatedData = req.body;  

    Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        })
        .catch((err) => {
            res.status(500).json({ message: "Cannot update product: " + err.message });
        });
}

export function deleteProduct(req, res) {
    if (req.user == null) {
        res.status(401).json({ message: "Please login and try again" });
        return;
    }

    if (req.user.role !== "admin") {
        res.status(403).json({ message: "You are not allowed to delete products" });
        return;
    }

    const { id } = req.params; // Assuming product ID is passed as a URL parameter

    Product.findByIdAndDelete(id)
        .then((deletedProduct) => {
            if (!deletedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
        })
        .catch((err) => {
            res.status(500).json({ message: "Cannot delete product: " + err.message });
        });
}
