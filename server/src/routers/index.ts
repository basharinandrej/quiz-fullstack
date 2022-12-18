import {Router} from 'express'
import {routerUser} from './router-user'
const router = Router()

router.use('/user', routerUser)

export default router