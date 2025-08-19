import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import  uploadCloudinary  from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";



const generateAccessAndRefreshTokens = async (userId) => {

  try {

    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return {accessToken,refreshToken}

    
  } catch (error) {
    throw new apiError(500, 'something went wrong while generating refresh and access tokens')
  }

}

export const registerUser = asyncHandler(async (req, res) => {
  
  const {fullname,email,username,password} = req.body
  if(
    [fullname,email,username,password].some((field) => field?.trim() === '' )
  ){
    throw new apiError(400,'all fields are required')
    
  }
  // console.log(req.body)

  const existedUser = await User.findOne({
    $or: [{username},{email}]
  })

  if(existedUser){
    throw new apiError(409,'user already exist')
  }
  // console.log(req.files)
  const avatarLocalPath = await req.files?.avatar[0]?.path
  // const coverImageLocalPath = await  req.files?.coverImage[0]?.path
  let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImage = req.files.coverImage[0].path
  }

  if(!avatarLocalPath){
    throw new apiError(400,'avatar is required')
  }

  const avatar = await uploadCloudinary(avatarLocalPath)
  const coverImage = await uploadCloudinary(coverImageLocalPath)





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
  return res.status(response.statusCode).json(response)
});

export const userLogin = asyncHandler(async (req,res) => {
  const {email,username,password} = req.body

  if (!username || !password){
    throw new apiError(400, 'Both username or password required')
  }
  const user = await User.findOne({
    $or: [{username}, {password}]
  })

  if(!user) {
    throw new apiError(404, 'user does not exist')
  }
 const isPasswordValid =  await user.isPasswordCorrect(password)
 if(!isPasswordValid) {
    throw new apiError(404, 'password ivalid credentials')
  }

  const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

  const logedInUser = User.findById(user._id).select('-password -refreshToken')

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200,).cookie('accessToken',accessToken,options)
  .cookie('refreshToken', refreshToken,options)
  .json(
    new apiResponse(200,{
      user: logedInUser,accessToken,refreshToken
    },
    "User Loged in sucessfully! "
  )
  )

 
})

export const logedOut =  asyncHandler(async () => {

  User.findByIdAndUpdate(req.user_id, 
    {
      refreshToken: undefined
    },
    {
      new: true
    }
  )
   const options = {
    httpOnly: true,
    secure: true
  }

  res.status(200).clearCookie('accessToken',options)
  .json(new apiResponse(200,{},'user loged out sucessfully'))

})

