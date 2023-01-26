import {Router} from 'express'
import { controllerResult } from '#controllers/controller-result'
import {validation} from './validations-result'
import { sendErrorsMiddleware } from '#middlewares/send-errors-middleware'

const router = Router()

router.post('/',  
    validation.createChain(),
    sendErrorsMiddleware,
    controllerResult.create
)
router.get('/getOne', controllerResult.getOne)

export const routerResult = router