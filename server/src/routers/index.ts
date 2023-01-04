import {Router} from 'express'
import {routerUser} from '../routers/router-user'
import {routerQuiz} from '../routers/router-quiz'

const router = Router()

router.use('/user', routerUser)
router.use('/quiz', routerQuiz)

export default router