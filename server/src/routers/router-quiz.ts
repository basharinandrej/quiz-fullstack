import {Router} from 'express'
import controllerQuiz from '#controllers/controller-quiz'
import { header, body, query } from 'express-validator';
import { isAdminMiddleware } from '#middlewares/is-admin-middleware'
import { IQueryQuizAll } from '#controllers/controller-quiz/types'
import { Role } from 'common/types/types'

const router = Router()

router.get('/', 
    [
        query().custom((_, {req}) => {
            const { authorId, recipientId } = req.query as IQueryQuizAll;

            if(!recipientId && !authorId) {
                throw new Error('Одно из полей обязательно: recipientId, authorId');
            }
            return true
        })
    ],
    controllerQuiz.quizAll
)

router.post('/',
    [
        header('authorization').notEmpty().withMessage('Heт токена доступа').trim(),
        body('recipientId').notEmpty().withMessage('not recipientId').trim(),
    ], 
    controllerQuiz.create
)

router.delete('/',
    isAdminMiddleware(Role.ADMIN),
    controllerQuiz.delete)

export const routerQuiz = router