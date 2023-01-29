import {Router} from 'express'
import controllerQuiz from '#controllers/controller-quiz'
import { validation } from './validations-quiz'
import { sendErrorsMiddleware } from '#middlewares/send-errors-middleware'

const router = Router()

router.get('/getByUserId', 
    validation.getAllChain(),
    sendErrorsMiddleware,
    controllerQuiz.quizzesAllByUserId
)

router.get('/getAllQuizzes', 
    controllerQuiz.getAllQuizzes
)

router.post('/',
    validation.createChain(),
    sendErrorsMiddleware,
    controllerQuiz.create
)

router.delete('/',
    validation.deleteChain(),
    sendErrorsMiddleware,
    controllerQuiz.delete)

export const routerQuiz = router