import {Router} from 'express'
import ControllerUser from '#controllerscontroller-user'


const router = Router()

router.post('/registration', ControllerUser.registration)
router.post('/login', ControllerUser.login)

export const routerUser = router