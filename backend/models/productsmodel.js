import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },productName:{
        type:String,
        required:true
    },description:{
        type:String,
        required:false
    },price:{
        type:Number,
        required:true
    },labelPrice:{
        type:Number,
        required:false
    },altNames:{
        type:[String],
        default:[]
    },category:{
        type:String,
        default:"others"
    },isVisible:{
        type:Boolean,
        default:true,
        required:true
    },brand:{
        type:String,
        default:"Generic"
    },model:{
        type:String,
        default:"Standard"
    },images:{
        type:[String],
        default:["./images/default.png"]
    }

})

const product=mongoose.model("product",productSchema);

export default product;