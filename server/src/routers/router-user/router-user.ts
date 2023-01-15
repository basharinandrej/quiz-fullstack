import {Router} from 'express'
import {validation} from './validations-user'
import {controllerUser} from '#controllers/controller-user'


const router = Router()

router.post('/registration', 
    validation.registrationChains(),
    controllerUser.registration
)

router.post('/login', 
    validation.loginChains(),
    controllerUser.login
)

router.get('/getOne', 
    validation.getOneChains(),
    controllerUser.getOne
)

router.get('/getAll', controllerUser.getAll)

router.delete('/', 
    validation.deleteChains(), 
    controllerUser.delete
)

router.put('/', 
    validation.updateChains, 
    controllerUser.update
)

export const routerUser = router