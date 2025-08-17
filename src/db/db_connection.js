import mongoose from "mongoose";
import { DB_NAME } from "./constent.js";

// import { DB_NAME } from "../../constent";
console.log("MONGODB_URL from .env:", process.env.MONGODB_URL);
console.log("DB_NAME from .env:", DB_NAME);
const connect =  async () => {
    try{
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Database connected  on HOST ${connectionInstance.connection.host}`)
    }catch(error) {
        console.log(`Error caused why ${error}`)
        process.exit(1)
    }
}
export default connect