import {Router} from 'express'
import { body, query } from 'express-validator';
import {controllerUser} from '#controllers/controller-user'
import { User } from '#models/index'


const router = Router()

router.post('/registration', 
    [
        body('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long').trim(),
        body('email').isEmail().withMessage('uncorrect value').trim(),
        body('name').isLength({min: 2}).withMessage({length: 'length > 1'}).trim(),
        body('surname').isLength({min: 2}).withMessage({length: 'length > 1'}).trim()
    ],
    controllerUser.registration
)

router.post('/login', 
    [
        body('email').isEmail().withMessage('uncorrect value').trim()
    ],
    controllerUser.login
)

router.get('/getOne', 
    [
        query('id').notEmpty().withMessage('отсутствует id')
    ],
    controllerUser.getOne
)

router.get('/getAll', controllerUser.getAll)

router.delete('/', 
    [
        query('id').custom(id => {
            return User?.findOne({
                where: {id}
            }).then((user) => {
                if(!user) {
                    return Promise.reject(`User'a с id - ${id} нет`)
                }
            })
        })
    ], 
    controllerUser.delete
)

export const routerUser = router