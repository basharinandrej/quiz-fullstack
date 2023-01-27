import { body, header } from 'express-validator';
import { User } from '#models/index'
import { isPayloadTokenGuard} from '#guards'
import {serviceToken} from '#services/service-token'


export const validation = {
    createChain() {
        return [
            header('authorization').custom((value, {req}) => {
                const token = value.split(' ')[1]

                try {
                    const decode = serviceToken.validationToken(token)
                    if(isPayloadTokenGuard(decode)){
                        return Promise.resolve(false)
                    } else {
                        return Promise.resolve(true)
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
    }
}