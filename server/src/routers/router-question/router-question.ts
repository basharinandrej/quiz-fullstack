import {Router} from 'express'
const router = Router()
import controllerQuestion from '#controllers/controller-question'
import {validation} from './validation-question'
import { sendErrorsMiddleware } from '#middlewares/send-errors-middleware'


router.post('/',
    validation.createChain(),
    sendErrorsMiddleware,
    controllerQuestion.create
)

router.put('/',
    controllerQuestion.update
)

router.get('/',
    controllerQuestion.getAll
)

export const routerQuestion = router