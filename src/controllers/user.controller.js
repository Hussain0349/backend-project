import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { cloudinary } from "../utils/cloudinary.js";
import { apiResponse, apiResponse } from "../utils/apiResponse.js";



export const registerUser = asyncHandler(async (req, res) => {
  
  const {fullname,email,username,password} = req.body
  if(
    [fullname,email,username,password].some((field) => field?.trim() === '' )
  ){
    throw new apiError(400,'all fields are required')
    
  }

  const existedUser = User.findOne({
    $or: [{username},{email}]
  })

  if(existedUser){
    throw new apiError(409,'user already exist')
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if(!avatarLocalPath){
    throw new apiError(400,'avatar is required')
  }

  const avatar = await cloudinary(avatarLocalPath)
  const coverImage = await cloudinary(coverImageLocalPath)

  if(!avatar){
    throw new apiError(400,'avatar is required')
  }

  const user =  await  User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase()

  })
  const createdUser = await User.findById(user._id).select(
    "-password, -refreshToken"
  )
  if(!createdUser){
    throw new apiError(500,"something went wrong while registering the user")
  }
const response = new apiResponse(201,createdUser,"user registered Successfully! ")
  return res.status(200).json()
});

