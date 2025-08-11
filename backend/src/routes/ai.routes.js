import {Router} from 'express';
import {generatePositivePrompt,
    giveActivitySuggesstion,
    emotionTagging,
    weeklyAnalysis
} from '../controllers/ai.controllers.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'


const router = Router()

router.route('/positive-prompt').get(generatePositivePrompt)
router.route('/activity-suggesstion').get(giveActivitySuggesstion)
router.route('/emotion-tagging').get(emotionTagging)
router.route('/weekly-analysis').get(verifyJWT, weeklyAnalysis)



export default router