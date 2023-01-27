import {Router} from 'express'
import {controllerStatistic} from '#controllers/controller-statistics'
import { sendErrorsMiddleware } from '#middlewares/send-errors-middleware'
import {validation} from './validation-statistic'


const router = Router()

router.get('/getAll', controllerStatistic.getAll)

router.post('/',
    validation.createChain(),
    sendErrorsMiddleware,
    controllerStatistic.create
)

router.delete('/', 
    validation.deleteChain(),
    sendErrorsMiddleware,
    controllerStatistic.delete
)


export const routerStatistics = router