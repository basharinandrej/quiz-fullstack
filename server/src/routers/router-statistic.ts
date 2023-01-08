import {Router} from 'express'
import {controllerStatistic} from '#controllers/controller-statistics'


const router = Router()

router.get('/getAll', controllerStatistic.getAll)


export const routerStatistics = router