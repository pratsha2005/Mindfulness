import { Router } from "express";
import {createEntry,
    getAllEntries,
    getEntryByDate,
    getWeeklyAnalytics,
    getMonthlyAnalytics} from '../controllers/entry.controller.js'

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create-entry").post(verifyJWT, createEntry)
router.route("/get-all-entries").get(verifyJWT, getAllEntries)
router.route("/get-entry-by-date/:date").get(verifyJWT, getEntryByDate)
router.route("/get-weekly-analytics").get(verifyJWT, getWeeklyAnalytics)
router.route("/get-monthly-analytics").get(verifyJWT, getMonthlyAnalytics)

export default router