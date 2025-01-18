import express from "express";
import { addInquiry } from "../controller/inquiryController.js";
import{getInquiries} from  "../controller/inquiryController.js";
import {deleteInquiry,updateInquiry} from "../controller/inquiryController.js";



const inquiryRouter = express.Router();

inquiryRouter.post("/add", addInquiry);
inquiryRouter.get("/get", getInquiries);
inquiryRouter.delete("/delete/:id",deleteInquiry);
inquiryRouter.put("/update/:id",updateInquiry);

export default inquiryRouter;