import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouters.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
 
dotenv.config();

 
const app = express();
app.use(bodyParser.json());

//pahala eke next kiyanne ilagata me responce eka yanna ona kena
app.use((req,res,next)=>{ 
   let token = req.header("Authorization");

   if(token != null){
         token = token.replace("Bearer ","");

         jwt.verify(token,process.env.JWT_SECRET,
           (err,decoded)=>{ 
            if(!err){
               req.user = decoded;
                
            }

           
   })
   }
   
    next();
       
})




const mongoUrl= process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});




app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
 

app.listen(3000, () => {

    console.log("Server is running on port 3000");

});

