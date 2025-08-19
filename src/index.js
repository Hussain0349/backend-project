// import app from "./app.js";
// import connect from "./db/db_connection.js";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// dotenv.config({ path: join(__dirname, "../.env") });

// console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
// console.log("Mongo URL:", process.env.MONGODB_URL);



// // ;(async () => {
// //     try{
// //         mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
// //         app.on("error",(error)=> {
// //             console.log("app isnt talk to database",error)
// //         })
// //         app.listen(process.env.PORT,()=> {
// //             console.log(`App is listening on port ${process.env.PORT}`)
// //         })
// //     }
// //     catch(error) {
// //         console.log('error is caused',error)
// //     }
// // })()

// connect()
// .then(() => {
//     app.listen(PORT, () => {
//         console.log(`server is running on${PORT}`)
//     })
// })
// .catch((error) => {
//     console.log(`${error}`)
// });

/*  my 2nd code */
import {ENV} from "./config/env.js";
// import dotenv from "dotenv";

// dotenv.config({path:
//   '../.env'
// })

import app from "./app.js";
import connect from "./db/db_connection.js";


const PORT = ENV.PORT || 8000;

// console.log("Cloudinary API Key:", ENV.CLOUDINARY_API_KEY);
// console.log("Mongo URL:", ENV.MONGODB_URL);

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error}`);
  });

/* chatgpt */
