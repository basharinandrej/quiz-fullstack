import {Router} from 'express'
import controllerQuiz from '#controllers/controller-quiz'
import { header, body, query } from 'express-validator';
import { IQueryQuizAll } from '#controllers/controller-quiz/types'
import { Role } from 'common/types/types'
import jwt from 'jsonwebtoken';
import { isPayloadTokenGuard} from '#guards'
import { Quiz } from '#models/index'

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
    [
        header('authorization').custom((value, {req}) => {
            const token = value.split(' ')[1]
            const {id: quizId} = req.query as {id: number}
            if(!token) Promise.reject('Токена нет');

            return jwt.verify(token,
                process.env.SECRET_KEY || '', 
                async (err: jwt.VerifyErrors | null, decode: any): Promise<boolean | string | void> => {
                    if(err) {
                        return Promise.reject(err)
                    }
                    if(isPayloadTokenGuard(decode)) {
                        if(decode.role === Role.ADMIN) {
                            return Promise.resolve(true)
                        } else {
                            return Quiz?.findOne({
                                where: {
                                    id: quizId
                                }
                            })
                            .then((quizForDeleting) => {                                       
                                if(quizForDeleting?.dataValues?.userId === decode.id) {
                                    return Promise.resolve(true)
                                }else {
                                    return Promise.reject('quiz другого пользователя млжет удалить только ADMIN')
                                }
                            })
                        }
                    } 
                })
        }),
    ],
    controllerQuiz.delete)

export const routerQuiz = router