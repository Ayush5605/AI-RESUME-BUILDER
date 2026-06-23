import express from"express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./Controller/db.js";

const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 4040;


await connectDB();

app.get('/',(req,res)=>{
    res.send("Server is live ");

});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
