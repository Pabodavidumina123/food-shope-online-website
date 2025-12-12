import express from 'express';
import mongoose from 'mongoose';
import userrouter from './router/userRouter.js';

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

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
