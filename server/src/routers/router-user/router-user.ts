import {Router} from 'express'
import {validation} from './validations-user'
import {controllerUser} from '#controllers/controller-user'
import { isAdminMiddleware } from '#middlewares/is-admin-middleware'
import { sendErrorsMiddleware } from '#middlewares/send-errors-middleware'
import { Role } from 'common/types/types'


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
    isAdminMiddleware(Role.ADMIN),
    sendErrorsMiddleware,
    controllerUser.delete
)

router.put('/', 
    validation.updateChains(),
    sendErrorsMiddleware,
    controllerUser.update
)

export const routerUser = router