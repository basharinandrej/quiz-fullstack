import { body } from 'express-validator';

export const validation = {
    createChain() {
        return  [
            body('text').notEmpty().withMessage('not text').trim(),
            body('quizId').notEmpty().withMessage('not quizId').trim(),
        ]
    }
}