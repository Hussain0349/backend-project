// import { v2 as cloudinary } from "cloudinary";
// import fs from 'fs';
// cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY , 
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });
// const uploadCloudinary = async (localFile) => {
//     try {
//         if (!localFile) return null

//         const response = await cloudinary.uploader.upload(localFile, {
//             resource_type: 'auto'
//         })
//         console.log('file uplaoded successfully',response.url)
//         return response
        
//     } catch (error) {

//         fs.unlinkSync(localFile) 
//         return null
        
//     }
// }

// const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });









import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ENV } from "../config/env.js";

// point dotenv to your src/.env
// dotenv.config({
//   path: path.resolve("./src/.env"),
// });

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});


const uploadCloudinary = async (localFile) => {
  try {
    if (!localFile) return null;

    const response = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFile)
    return response
  } catch (error) {
    if (localFile && fs.existsSync(localFile)) fs.unlinkSync(localFile);
    console.error("Upload failed:", error.message);
    return null;
  }
};

export default uploadCloudinary;

