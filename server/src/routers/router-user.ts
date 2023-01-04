import {Router} from 'express'
import {controllerUser} from '#controllers/controller-user'


const router = Router()

router.post('/registration', controllerUser.registration)
router.post('/login', controllerUser.login)

export const routerUser = router