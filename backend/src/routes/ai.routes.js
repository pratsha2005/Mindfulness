import {Router} from 'express';
import {generatePositivePrompt,
    giveActivitySuggesstion
} from '../controllers/ai.controllers.js'

const router = Router()

router.route('/positive-prompt').get(generatePositivePrompt)
router.route('/activity-suggesstion').get(giveActivitySuggesstion)





export default router