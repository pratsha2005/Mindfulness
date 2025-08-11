import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"

import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";


const registerUser = asyncHandler( async (req, res) => {

    const {fullName, username, email, password} = req.body

    if([fullName, username, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required !")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    }) 
    if(existedUser){
        throw new ApiError(409, "User already exist")
    }
    
 
    const user = await User.create({
        fullName,
        username: username,
        email,
        password
    })
    
    const createdUser = User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }
    const token = jwt.sign({
        userId: createdUser._id,
    }, process.env.TOKEN_SECRET)

    const options = {
        httpOnly: true,
        secure: false
    }

    return res.status(201)
    .cookie("token", token, options)
    .json(
       new ApiResponse(201, {
        user: user,
        token: token
       }, "User Created Successfully!!")
    )
})

const loginUser = asyncHandler( async (req, res) => {

    const {password, email} = req.body
    if(!email || !password){
        throw new ApiError(400, "All fields are required")
    }
    const user = await User.findOne({
        $or: [{ email }]
    })
    if (!user){
        throw new ApiError(404, "Unauthorised request")
    }
    const validPassword = await user.isPasswordCorrect(password)
    if(!validPassword){
        throw new ApiError(401, "Wrong Password")
    }
    
    const loggedInUser = await User.findById(user._id).select("-password")

    const token = jwt.sign({
        userId: loggedInUser._id,
    }, process.env.TOKEN_SECRET)

    const options = {
        httpOnly: true,
        secure: false
    }


    return res
    .status(200)
    .cookie("token", token, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser,
            token: token
        }, "User logged in successfully")
    )
})

const logoutUser = asyncHandler( async (req, res, next) => {

    const user = await User.findById(req.user._id)
    if(!user){
        throw new ApiError(404, "Unauthorised request")
    }
    const options = {
        httpOnly: true,
        secure: false
    }
    res
    .status(200)
    .clearCookie("token", options)
    .json(
        new ApiResponse(200, {user}, "User logged out")
    )
})

export { 
    registerUser,
    loginUser,
    logoutUser,
}; 