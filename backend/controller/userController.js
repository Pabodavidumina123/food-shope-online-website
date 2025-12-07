import User from '../models/user.js';



function createUser(req,res){

    const newUser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    })

    return newUser.save();

}
export default createUser;