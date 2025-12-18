import User from '../model/userModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default async function creatUser1(req,res){
try{
     const hashPassword1=bcrypt.hashSync(req.body.password,10);

    const user=new User({

       firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashPassword1


    })
    await user.save();
    return res.status(201).json({ message: "User Created Successfully" });
}catch(error){
   return  res.status(500).json({ error: "Error creating user" });
     
}
}