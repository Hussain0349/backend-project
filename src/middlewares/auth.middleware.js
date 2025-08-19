
import { User } from "../models/user.models";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import {jwt} from 'jasonwebtoken'
export const verifyJwt = asyncHandler(async (req,res,next) => {
    try {
        const Token = req.coockies?.accessToken || 
        req.Header("Authorization")?.replace("Bearer","")
    
        if(!Token){
            throw new apiError(401,"Unauthorized access")
        }
        const decodedToken = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new (401, 'invalid access token')
        }
        req.user = user;
        next()
    } catch (error) {
        throw new apiError(401,error?.message || 'invalid token')        
    }
    
})