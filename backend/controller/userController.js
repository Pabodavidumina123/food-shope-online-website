import User from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




// Get all users
export function getUser(req, res) {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).json({ error: "Internal server error" });
        });
}

// Create new user
export async function createUser(req, res) {
try{
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });

     await newUser.save()

     return res.status(200).json({message:"User Created Successfully"});
    
    } catch (error) {
    return res.status(500).json({
      message: "User creation failed",
    });
  }
}

// Login user
export function loginUser(req,res) {

    User.findOne({ email: req.body.email })
        .then((User) => {

            if (User==null) {
                return res.status(400).json({ error: "Email not found" });
            }

            const isPasswordValid = bcrypt.compareSync(req.body.password, User.password);

            if (isPasswordValid) {

                    const token=jwt.sign({
                        email:User.email,
                        firstName:User.firstName,
                        lastName:User.lastName,
                        role:User.role,
                        image:User.image,
                        isEmailVerified:User.isEmailVerified


                    },"i-computer 500!");

                    console.log(token);
                    console.log({

                        email:User.email,
                        firstName:User.firstName,
                        lastName:User.lastName,
                        role:User.role,
                        image:User.image,
                        isEmailVerified:User.isEmailVerified

                    })


                res.status(200).json({ 
                    message: "Login successful" ,
                    token: token

                });
            } else {
                res.status(401).json({ error: "Invalid password" });
            }

            
        })
        .catch((err) => {
            res.status(500).json({ error: "Login error" });
        });
}
export async function updateUser(req,res){
    if(!isAdmin(req)){
        res.status(403).json({error:"Access denied"});
        return;
    }
    try{
        const userId=req.params.userId;
        const data={};
        if(req.body.firstName==null){
            res.status(400).json({message:"First name is required"});
            return;
        }
        data.firstName=req.body.firstName;
        data.lastName=req.body.lastName;
        data.email=req.body.email;
        data.password=bcrypt.hashSync(req.body.password,10);

        await User.updateOne({userId:userId},data);
        res.status(200).json({message:"User updated successfully"});
    }catch(error){
        res.status(400).json({message:"Error updating user",error:error});
    }
}


export function isAdmin(req){

    if(req.user==null){
        return false;
    }
    if(req.user.role=="admin"){
        return true;
    }else{
        return false;
    }

}

