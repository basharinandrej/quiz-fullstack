import {Router} from 'express'
import controllerQuiz from '#controllers/controller-quiz'
import { header, body } from 'express-validator';

const router = Router()

router.get('/', controllerQuiz.quizAll)
router.post('/', 
    [
        header('authorization').notEmpty().withMessage('Heт токена доступа').trim(),
        body('recipientId').notEmpty().withMessage('not recipientId').trim()
    ], 
    controllerQuiz.create
)

export const routerQuiz = router