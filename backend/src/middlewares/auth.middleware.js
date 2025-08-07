import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"


export const verifyJWT = asyncHandler(async(req, res, next) => {

    try {
        const token = req.cookies?.token
        || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new ApiError(401, "Unauthorised request")
        }
        
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded?.userId).select("-password -refreshToken") //_id is key of userid in token
        if(!user){
            throw new ApiError(401, "Invalid Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401 ,error?.message || "Invalid Access Token")
    }
})
