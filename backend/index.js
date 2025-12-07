import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';

const app = express();

const mongoURI="mongodb+srv://admin:vidumina12345@cluster1.qgtkaef.mongodb.net/?appName=Cluster1"

mongoose.connect(mongoURI).then(()=>{

    console.log("connected to mongoDB");
}).catch(()=>{
    console.log("error connecting to mongoDB");
})

app.use("/user",userRouter);



//middleware
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



//mongodb+srv://admin:vidumina12345@cluster1.qgtkaef.mongodb.net/?appName=Cluster1