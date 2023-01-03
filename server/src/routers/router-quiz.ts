import {Router} from 'express'
import controllerQuiz from '#controllerscontroller-quiz'

const router = Router()

router.get('/', controllerQuiz.quizAll)
router.post('/', controllerQuiz.create)

export const routerQuiz = router