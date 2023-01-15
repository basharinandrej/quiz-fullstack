import { body, query } from 'express-validator';
import { User } from '#models/index'


export const validation = {
    registrationChains() {
        return [
            body('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long').trim(),
            body('email').isEmail().withMessage('uncorrect value').trim(),
            body('name').isLength({min: 2}).withMessage({length: 'length > 1'}).trim(),
            body('surname').isLength({min: 2}).withMessage({length: 'length > 1'}).trim()
        ]
    },

    loginChains() {
        return [
            body('email').isEmail().withMessage('uncorrect value').trim()
        ]
    },

    getOneChains() {
        return [
            query('id').notEmpty().withMessage('отсутствует id')
        ]
    },

    deleteChains() {
        return     [
            query('id').custom(id => {
                return User?.findOne({
                    where: {id}
                }).then((user) => {
                    if(!user) {
                        return Promise.reject(`User'a с id - ${id} нет`)
                    }
                })
            })
        ]
    },

    updateChains() {
        return [
            body('id').notEmpty().withMessage('uncorrect value').trim(),
            body('name').custom(name => {
                if(name) {
                    if(name.length <= 1) {
                        return Promise.reject('name должен быть больше 1')
                    }
                }
                return true
            }),
            body('surname').custom(surname => {
                if(surname) {
                    if(surname.length <= 1) {
                        return Promise.reject('surname должен быть больше 1')
                    }
                }
                return true
            }),
        ]
    }
}
