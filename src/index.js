import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constent";
import express from "express";
import connect from "./db/db_connection.js";
import { MongooseError } from "mongoose";

// const app = express()

const PORT = process.env.PORT || 8000;




// ;(async () => {
//     try{
//         mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=> {
//             console.log("app isnt talk to database",error)
//         })
//         app.listen(process.env.PORT,()=> {
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     }
//     catch(error) {
//         console.log('error is caused',error)
//     }
// })()

connect()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on${PORT}`)
    })
})
.catch((error) => {
    console.log(`${error}`)
});