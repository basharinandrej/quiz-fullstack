import { body } from 'express-validator';
import { User } from '#models/index'


export const validation = {
    createChain() {
        return [
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