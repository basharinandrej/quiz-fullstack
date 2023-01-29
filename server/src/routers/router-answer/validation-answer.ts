import { body } from 'express-validator';


export const validation = {
    createChain() {
        return  [
            body('text').notEmpty().withMessage('not text').trim(),
            body('questionId').notEmpty().withMessage('not questionId').trim(),
            body('isRightAnswer').notEmpty().isBoolean().withMessage('not isRightAnswer').trim(),
        ]
    }
}