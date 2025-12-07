import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true,   
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },lastName:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true,
        unique:true
    },isblocked:{
        type:Boolean,
        default:false,
        required:true
    },isEmailVerified:{
        type:Boolean,
        default:false,
        required:true
    },profilePicture:{
        type:String,
        default:"img/default.png",
        required:true
    },role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        required:true
    }
});
const User=mongoose.model("User",userSchema);

export default User;