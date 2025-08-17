import { v2 as cloudinary } from "cloudinary";

import fs from 'fs'
;

const cloudinary = async (localFile) => {
    try {
        if (!localFile) return null

        const response = await cloudinary.uploader.upload(localFile, {
            resource_type: 'auto'
        })
        console.log('file uplaoded successfully',response.url)
        return response
        
    } catch (error) {

        fs.unlinkSync(localFile) 
        return null
        
    }
}

const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });




cloudinary.config({ 
        cloud_name: COUDINARY_CLOUD_NAME , 
        api_key: COUDINARY_API_KEY , 
        api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


export {cloudinary} 