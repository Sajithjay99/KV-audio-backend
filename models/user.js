import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,

        },
        password:{
            type: String,
            required: true,
            
        },
        role:{
            type: String,
            required: true,
            default:"customer",
        },
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        Phone:{
            type: String,
            required: true,
        },
        profilePicture:{
            type: String,
            required: true,
            default: "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
        }
        

    }
);

const  User = mongoose.model("User", userSchema);  
export default User;


// user "email": "sajith@gmail.com" "password": "123",

// admin  "email": "sajith1@gmail.com" "password": "123",