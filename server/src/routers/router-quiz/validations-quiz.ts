import { body, query, header } from 'express-validator';
import { IQueryQuizAllByUserId } from '#controllers/controller-quiz/types'
import { isPayloadTokenGuard} from '#guards'
import { Quiz } from '#models/index'
import { Role } from 'common/types/types'
import {extractAccessToken} from '#common/utils/extractToken'
import {serviceToken} from '#services/service-token'


export const validation = {
    getAllChain() {
        return [
            header('authorization').custom((value, {req}) => {
                const token = extractAccessToken(value)

                try {
                    serviceToken.validationToken(token)
                    return Promise.resolve(true);
                } catch (error) {
                    console.log('error', error)
                    return Promise.reject(error);
                }
            }),
            query().custom((_, {req}) => {
                const { authorId, recipientId } = req.query as IQueryQuizAllByUserId;
    
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
                const token = extractAccessToken(value)
                const {id: quizId} = req.query as {id: number}
                
                try {
                    const decode = serviceToken.validationToken(token)
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
                            } else {
                                return Promise.reject('quiz другого пользователя млжет удалить только ADMIN')
                            }
                        })
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            }),
        ]
    }
}