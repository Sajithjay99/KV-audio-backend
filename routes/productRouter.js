import express from 'express';
import { addProduct } from '../controller/productContoller.js';


const productRouter = express.Router();

productRouter.post("/add", addProduct);

export default productRouter;