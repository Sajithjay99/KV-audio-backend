import express from 'express';
import { addProduct } from '../controller/productContoller.js';
import { getProducts } from '../controller/productContoller.js';
import {updateProduct} from '../controller/productContoller.js';
import {deleteProduct} from '../controller/productContoller.js';


const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/get", getProducts);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;