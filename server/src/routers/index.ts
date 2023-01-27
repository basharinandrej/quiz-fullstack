import {Router} from 'express'
import {routerUser} from './router-user/router-user'
import {routerQuiz} from './router-quiz/router-quiz'
import {routerResult} from './router-result/router-result'
import {routerStatistics} from './router-statistic/router-statistic'

const router = Router()

router.use('/user', routerUser)
router.use('/quiz', routerQuiz)
router.use('/result', routerResult)
router.use('/statistic', routerStatistics)

export default router