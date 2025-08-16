import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Entry } from "../models/entry.models.js";
import { getModel } from "../utils/AI.js";


const createEntry = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { mood, journalText, activities, sleepHours, waterIntake } = req.body;
  let date = new Date()
  date = date.setHours(0,0,0,0)
  const existing = await Entry.findOne({ userId, date });
  const moodClassification = await getModel(`
    Classify on the basis of the following journal text: ${journalText},
    the mood of the user among the following: ["Happy", "Sad", "Angry", "Neutral"]
    `)
  
  if (existing) {
    return res.status(400).json({ message: "Entry already exists for this date." });
  }

  const entry = await Entry.create({
    userId,
    date,
    mood,
    journalText,
    activities,
    sleepHours,
    waterIntake,
    moodClassification
  });

  res.status(201).json(
    new ApiResponse(201, entry, "Entry created successfully")
  );
});


const getAllEntries = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const entries = await Entry.find({ userId }).sort({ date: -1 });
  res.status(200).json(
    new ApiResponse(200, entries, "All entries retrieved successfully")
  );
});


//router.get('/entries/:date', protect, getEntryByDate);

const getEntryByDate = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const date = new Date(req.params.date);

  const entry = await Entry.findOne({ userId, date });
  if (!entry) {
    return res.status(404).json({ message: "No entry found for this date." });
  }

  res.status(200).json(
    new ApiResponse(200, entry, "Entry retrieved successfully")
  );
});


// GET /api/analytics/weekly
const getWeeklyAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 6);

  const entries = await Entry.find({
    userId,
    date: { $gte: weekAgo, $lte: today },
  })
    .select("date moodClassification mood -_id") // only required fields
    .sort({ date: 1 }); // ascending order by date


  if (!entries || entries.length === 0) {
    return res.status(200).json({
      success: true,
      data: [],
      averageMoodScore: null,
      message: "No entries found for this week",
    });
  }

   const avgMood =
    entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length;

  res.status(200).json({
    success: true,
    data: entries,
    averageMoodScore: avgMood.toFixed(2),
  });

});

// GET /api/analytics/monthly
const getMonthlyAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const today = new Date();
  const monthAgo = new Date();
  monthAgo.setDate(today.getDate() - 30);

  const entries = await Entry.find({
    userId,
    date: { $gte: monthAgo, $lte: today }
  });

  res.status(200).json({ entries });
});




export {
    createEntry,
    getAllEntries,
    getEntryByDate,
    getWeeklyAnalytics,
    getMonthlyAnalytics
}
