import {Router} from 'express'
import {controllerUser} from '#controllers/controller-user'


const router = Router()

router.post('/registration', controllerUser.registration)
router.post('/login', controllerUser.login)
router.get('/getOne', controllerUser.getOne)
router.get('/getAll', controllerUser.getAll)


export const routerUser = router