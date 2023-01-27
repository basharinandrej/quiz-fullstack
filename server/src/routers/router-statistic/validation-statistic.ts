import { body, header, query } from 'express-validator';
import { User, Statistics } from '#models/index'
import { isPayloadTokenGuard} from '#guards'
import {serviceToken} from '#services/service-token'
import {extractAccessToken} from '#common/utils/extractToken'
import {Role} from '#common/types/types'


export const validation = {
    createChain() {
        return [
            header('authorization').custom((value) => {
                const token = extractAccessToken(value)

                try {
                    const decode = serviceToken.validationToken(token)
                    if(isPayloadTokenGuard(decode)){
                        return Promise.resolve(true)
                    } else {
                        return Promise.reject(false)
                    }
                } catch (error) {
                    return Promise.reject(error);
                }    

            }),
            body('totalRightAnswers').notEmpty().withMessage(''),
            body('totalQuestions').notEmpty().withMessage(''),
            body('rating').notEmpty().withMessage(''),
            body('quizId').notEmpty().withMessage(''),
            body('userId').custom((id) => {
                return User?.findOne({ 
                    where: {id}
                }).then(user => {
                    if (!user) {
                        return Promise.reject(`Нет юзера с таким id - ${id}`); 
                    }
                });
              }),
        ]
    },

    deleteChain() {
        return [
            header('authorization').custom((value) => {
                const token = extractAccessToken(value)

                try {
                    const decode = serviceToken.validationToken(token)
                    if(isPayloadTokenGuard(decode)){
                        if(decode.role === Role.ADMIN) {
                            return Promise.resolve(true)
                        } else {
                            return Promise.reject('Удалять result может только ADMIN')

                        }
                    } else {
                        return Promise.reject(false)
                    }
                } catch (error) {
                    if(error instanceof Error) {
                        return Promise.reject(error.message);
                    }
                } 
            }),
            query('id').custom( async (id) => {
                if(!id) return

                return await Statistics?.findOne({
                    where: {id}
                }).then((statistic) => {
                    if(!statistic?.dataValues.id) {
                        return Promise.reject(`statistic с id - ${id} нет`)
                    }
                })
            }),
        ]
    }
}