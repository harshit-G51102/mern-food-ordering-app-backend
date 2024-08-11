import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    auth0id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    addressLine:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    }
});

const User=mongoose.model("user",userSchema);
export default User;