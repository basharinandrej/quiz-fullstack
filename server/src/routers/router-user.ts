import {Router} from 'express'
import { check } from 'express-validator';
import {controllerUser} from '#controllers/controller-user'


const router = Router()

router.post('/registration', 
    [
        check('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long').trim(),
        check('email').isEmail().withMessage('uncorrect value').trim(),
        check('name').isLength({min: 2}).withMessage({length: 'length > 1'}).trim(),
        check('surname').isLength({min: 2}).withMessage({length: 'length > 1'}).trim()
    ],
    controllerUser.registration
)

router.post('/login', controllerUser.login)
router.get('/getOne', controllerUser.getOne)
router.get('/getAll', controllerUser.getAll)


export const routerUser = router