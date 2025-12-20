import express from 'express';
import mongoose from 'mongoose';
import userrouter from './router/userRouter.js';
import AuthorizationUser from './lib/jwtMiddleware.js';
import productRouter from './router/productRouter.js';


// MongoDB connection
const mongoURI = "mongodb+srv://admin:vidumina12345@cluster1.qgtkaef.mongodb.net/?appName=Cluster1";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });

const app = express();
// Middleware
app.use(express.json());

app.use(AuthorizationUser);

// Routes (protected)
app.use("/user",userrouter);
app.use("/product",productRouter)

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});







/* const timeleft=50;
function finddb(){
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(timeleft>30){
            console.log("Starting soon");
            resolve({
                topic:"JavaScript",
                duration:"2 hours"
            });
        }else{
            console.log("Taking longer than expected");
        }
    },5000)
})
}
const result=await finddb();
console.log(result);
 */
/*mypromise.then((result)=>{
    console.log(result)
    console.log("Event Started");
}).catch((error)=>{
    console.log("Error:",error);
})*/