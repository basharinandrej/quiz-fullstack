import {Router} from 'express'
import {controllerStatistic} from '#controllers/controller-statistics'


const router = Router()

router.get('/getAll', controllerStatistic.getAll)
router.post('/', controllerStatistic.create)


export const routerStatistics = router