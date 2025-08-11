import { getModel } from "../utils/AI.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Entry } from "../models/entry.models.js";

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

const weeklyAnalysis = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const today = new Date();

    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    
    const entries = await Entry.find({
      userId: userId,
      createdAt: { $gte: weekAgo, $lte: today }
    }).sort({ createdAt: 1 });

    if (!entries.length) {
      return res.status(404).json({ success: false, message: "No journals found for this week." });
    }

    let journalSummary = entries.map(entry => {
      return `
        Date: ${entry.date.toDateString()}
        Mood: ${entry.mood}
        Activities: ${entry.activities.join(", ") || "None"}
        Sleep Hours: ${entry.sleepHours}
        Water Intake: ${entry.waterIntake}L
        Journal: ${entry.journalText || "No notes"}
        `;
    }).join("\n");


    // AI prompt
    const prompt = `
You are a compassionate mental health assistant. 
Analyze the following journal entries from the past week. 
Keep it within 1-3 lines long

Provide:
1. A summary of recurring emotions and themes.
2. Possible triggers for these emotions.
3. Suggestions for mindfulness or self-care.
4. One uplifting affirmation for the coming week.

Journals:
${journalSummary}
    `;

    // Call Gemini API
    const response = await getModel(prompt)

    return res.status(200).json(
        new ApiResponse(200, "Analysis done successfully", response)
    );
})

const emotionTagging = asyncHandler(async(req, res) => {
    const {journal} = req.body
    const response = await getModel(`Based on the journal entry: ${journal}, classify the 
        emotion using one word whether it is [happy, sad, energetic, depressed]`)
    res.status(200)
    .json(
        new ApiResponse(
            200, "emotion got successfully", response
        )
    )
})


export {
    generatePositivePrompt,
    giveActivitySuggesstion,
    emotionTagging,
    weeklyAnalysis
}