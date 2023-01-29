import {Router} from 'express'
import controllerAnswer from '#controllers/controller-answer'
import {validation} from './validation-answer'
import { sendErrorsMiddleware } from '#middlewares/send-errors-middleware'

const router = Router()

router.post('/',
    validation.createChain(),
    sendErrorsMiddleware,
    controllerAnswer.create
)


export const routerAnswer = router