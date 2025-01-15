import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 


export function registerUser(req,res){

    const Userdata = req.body;
    Userdata.password = bcrypt.hashSync(Userdata.password, 10);
    const newUser = new User(req.body);
       
    

    newUser.save().then(
        ()=>{
            res.status(200).json("User added successfully");
        }
    ).catch(
        (err)=>{
            res.status(500).json("cannot added user: "+err);
        }
    );
}


 
export function loginUser(req, res) {
    const data = req.body;

    User.findOne({
        email: data.email,
    }).then(
        (user)=>{
            if(user == null){
                res.status(400).json("User not found");
        } else {
             const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

             if(isPasswordCorrect){
                    const token = jwt.sign({
                       firstName: user.firstName,
                       lastName: user.lastName,
                       email: user.email,
                       role: user.role,
                    
                    }, "sajithSecretKey")

                 res.status(200).json({message :"Login successful", token : token});
             } else {
                 res.status(400).json("Login failed");
             }
        }} 
    )
    .catch(
        (err)=>{
            res.status(500).json("Error: "+err);
        }
    );
    






}