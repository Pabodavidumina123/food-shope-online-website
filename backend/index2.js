export default function  logingUser1(req,res){

    User.findone({email:req.body.email}).then((User)=>{
        if(User==null){
            return res.status(400).json({message:"Email not found"});
        }
        const isPasswordValid=bcrypt.compareSync(req.body.password,User.password);

        if(isPasswordValid){
            
            const token=jwt.sign({
                email:User.email,
                firstName:User.firstName,
                lastName:User.lastName,
                role:User.role,
                image:User.image,
                isEmailVerified:User.isEmailVerified
            },"company 500!");

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
                message:"Login successful",
                token:token
            })
        }else{
            res.status(401).json({message:"Invalid password"
            })
        }
    }).catch((error)=>{
        res.status(500).json({message:"Login error"});
    })

}