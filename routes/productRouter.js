import express from 'express';
import { addProduct } from '../controller/productContoller.js';
import { getProducts } from '../controller/productContoller.js';


const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/get", getProducts);

export default productRouter;