
import {isAdmin} from "./userController.js";
import product from "../models/productsmodel.js";

export async function createProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({error:"Access denied"});
        return;
    }

try{

   const creatproduct= await product.findOne({productId:req.body.productId})

   if(creatproduct){
    return res.status(400).json({error:"Product already exists"});
   }

   const data={}
   data.productId=req.body.productId;

   if(req.body.productName==null || req.body.productName==undefined){
    res.status(400).json({error:"Product name is required"});
    return;
   }

    data.productName=req.body.productName;
    data.description=req.body.description || "";
    if(req.body.price==null)
{
    res.status(400).json({error:"Price is required"});
    return;
}
    data.price=req.body.price;
    data.labelPrice=req.body.labelPrice||req.body.price;
    data.altNames=req.body.altNames ||[];
    data.category=req.body.category ||"others";
    data.isVisible=req.body.isVisible;
/*     data.images=req.body.images ||[
        "/images/product/default1.png",
        "/images/product/default2.png"
    ]
    data.model=req.body.model ||"Standard";
    data.brand=req.body.brand||"generic";

 */

    const newProduct=new product(data);

    await newProduct.save();

    res.status(200).json({message:"Product created successfully"});


}catch(error){

    res.status(400).json({message:"error creating product",error:error})

}
}
