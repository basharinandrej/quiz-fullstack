import { body, header } from 'express-validator';
import { User } from '#models/index'
import jwt from 'jsonwebtoken';
import { isPayloadTokenGuard} from '#guards'


export const validation = {
    createChain() {
        return [
            header('authorization').custom((value, {req}) => {
                const token = value.split(' ')[1]
                if(!token) Promise.reject('Токена нет');

                const decode = jwt.verify(token, process.env.SECRET_KEY || '')

                if(isPayloadTokenGuard(decode)){
                    return Promise.resolve(false)
                } else {
                    return Promise.resolve(true)
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