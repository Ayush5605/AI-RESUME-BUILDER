import express from"express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./Config/db.js";
import userRouter from "./View/userRoutes.js";

const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 4040;


await connectDB();

app.get('/',(req,res)=>{
    res.send("Server is live ");

});

app.use('/api/users',userRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
