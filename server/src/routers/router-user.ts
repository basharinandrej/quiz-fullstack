import {Router} from 'express'
import ControllerUser from '../controllers/controller-user/controller-user'


const router = Router()

router.post('/registration', ControllerUser.registration)

export const routerUser = router