import {Router} from 'express'
import { controllerResult } from '#controllers/controller-result'
import { body } from 'express-validator';
import { User } from '#models/index'

const router = Router()

router.post('/', 
    [
        body('totalRightAnswers').notEmpty().withMessage('sd'),
        body('totalQuestions').notEmpty().withMessage('sd'),
        body('rating').notEmpty().withMessage('sd'),
        body('quizId').notEmpty().withMessage('sd'),
        body('userId').custom((id) => {
            return User?.findOne({ 
                where: {id}
            }).then(user => {
                if (!user) {
                    return Promise.reject(`Нет юзера с таким id - ${id}`); 
                }
            });
          }),
    ], 
    controllerResult.create
)
router.get('/getOne', controllerResult.getOne)

export const routerResult = router