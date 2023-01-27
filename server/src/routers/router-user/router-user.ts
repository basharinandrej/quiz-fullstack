import {Router} from 'express'
import {validation} from './validations-user'
import {controllerUser} from '#controllers/controller-user'
import { sendErrorsMiddleware } from '#middlewares/send-errors-middleware'

const router = Router()

router.post('/registration', 
    validation.registrationChains(),
    sendErrorsMiddleware,
    controllerUser.registration
)

router.post('/login', 
    validation.loginChains(),
    sendErrorsMiddleware,
    controllerUser.login
)

router.get('/getOne', 
    validation.getOneChains(),
    sendErrorsMiddleware,
    controllerUser.getOne
)

router.get('/getAll', controllerUser.getAll)

router.delete('/',
    validation.deleteChains(),
    sendErrorsMiddleware,
    controllerUser.delete
)

router.put('/', 
    validation.updateChains(),
    sendErrorsMiddleware,
    controllerUser.update
)

router.get('/logout',
    validation.logoutChains(),
    sendErrorsMiddleware,
    controllerUser.logout
)

export const routerUser = router