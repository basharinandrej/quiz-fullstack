import {Router} from 'express'
import {routerUser} from './router-user'
import {routerQuiz} from './router-quiz'

const router = Router()

router.use('/user', routerUser)
router.use('/quiz', routerQuiz)

export default router