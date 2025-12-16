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
export function createUser(req, res) {

    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });

    newUser.save()
        .then(() => {
            res.status(201).json({ message: "User Created Successfully" });
        })
        .catch((err) => {
            res.status(500).json({ error: "Error creating user" });
        });
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
