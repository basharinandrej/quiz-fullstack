import { body, query, header } from 'express-validator';
import { IQueryQuizAll } from '#controllers/controller-quiz/types'
import jwt from 'jsonwebtoken';
import { isPayloadTokenGuard} from '#guards'
import { Quiz } from '#models/index'
import { Role } from 'common/types/types'


export const validation = {
    getAllChain() {
        return [
            query().custom((_, {req}) => {
                const { authorId, recipientId } = req.query as IQueryQuizAll;
    
                if(!recipientId && !authorId) {
                    throw new Error('Одно из полей обязательно: recipientId, authorId');
                }
                return true
            })
        ]
    },
    createChain() {
        return  [
            header('authorization').notEmpty().withMessage('Heт токена доступа').trim(),
            body('recipientId').notEmpty().withMessage('not recipientId').trim(),
        ]
    },
    deleteChain() {
        return [
            query('id').custom(id => {
                if(!id) return

                return Quiz?.findOne({
                    where: {id}
                }).then((quiz) => {
                    if(!quiz?.dataValues.id) {
                        return Promise.reject(`Quiz с id - ${id} нет`)
                    }
                })
            }),
            header('authorization').custom((value, {req}) => {
                const token = value.split(' ')[1]
                const {id: quizId} = req.query as {id: number}
                if(!token) Promise.reject('Токена нет');
    
                const decode = jwt.verify(token, process.env.SECRET_KEY || '')
                if(!isPayloadTokenGuard(decode)) return 

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
            }),
        ]
    }
}