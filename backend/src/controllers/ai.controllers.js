import { getModel } from "../utils/AI.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generatePositivePrompt = asyncHandler(async(req, res) => {
    const response = await getModel(`Generate a short, reflective journaling prompt for a user practicing mindfulness today. Keep it simple and calming.
        Keep it one liner`)
    res.status(200)
    .json(
        new ApiResponse(200, "Success", response)
    )
})

const giveActivitySuggesstion = asyncHandler(async(req, res) => {
    const {journal} = req.body
    const response = await getModel(`Based on the journal entry: ${journal}, suggest a simple mindfulness activity they could try
        Keep it one liner`)
    res.status(200)
    .json(
        new ApiResponse(
            200, "Prompt fetched successfully", response
        )
    )
})



export {
    generatePositivePrompt,
    giveActivitySuggesstion
}