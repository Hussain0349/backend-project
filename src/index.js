import dotenv from "dotenv";
dotenv.config();
// import mongoose from "mongoose";
// import { DB_NAME } from "./constent";
import express from "express";
import connect from "./db/db_connection.js";
import { MongooseError } from "mongoose";

const app = express()






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
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running in ${PORT}`)
    })
})
.catch((error) => {
    console.log(`${error}`)
});