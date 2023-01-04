import {Router} from 'express'
import {routerUser} from '../routers/router-user'
import {routerQuiz} from '../routers/router-quiz'
import {routerResult} from '../routers/router-result'

const router = Router()

router.use('/user', routerUser)
router.use('/quiz', routerQuiz)
router.use('/result', routerResult)

export default router