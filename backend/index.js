import express from 'express';
import mongoose from 'mongoose';
import userrouter from './router/userRouter.js';
import jwt from "jsonwebtoken";

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb+srv://admin:vidumina12345@cluster1.qgtkaef.mongodb.net/?appName=Cluster1";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });

// Routes
app.use("/user", userrouter);

app.use((req,res,next)=>{
    console.log("request recived");

    const token=req.headers("Authorization");

    if(token!=null){

        const token=header.replace("Bearer ","");
    }

    jwt.verify(token,"i-computer 500!",(err,decode)=>{

        console.log(decode);
        req.user=decode;
    })

    next();
})

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
