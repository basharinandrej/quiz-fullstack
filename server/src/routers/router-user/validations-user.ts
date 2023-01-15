import { body, query } from 'express-validator';
import { User } from '#models/index'


export const validation = {
    registrationChains() {
        return [
            body('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long').trim(),
            body('email').isEmail().withMessage('uncorrect value').trim(),
            body('name').isLength({min: 2}).withMessage({length: 'length > 1'}).trim(),
            body('surname').isLength({min: 2}).withMessage({length: 'length > 1'}).trim(),
            body('email').custom(email => {
                return User?.findOne({
                    where: {email}
                }).then((user) => {
                    if(user) {
                        return Promise.reject(`Пользователь с email - ${email} уже есть`)
                    }
                })
            })
        ]
    },

    loginChains() {
        return [
            body('email').isEmail().withMessage('uncorrect value').trim(),
            body('email').custom(email => {
                return User?.findOne({
                    where: {email}
                }).then((user) => {
                    if(!user) {
                        return Promise.reject(`User'a с email - ${email} нет`)
                    }
                })
            })
        ]
    },

    getOneChains() {
        return [
            query('id').notEmpty().withMessage('отсутствует id')
        ]
    },

    deleteChains() {
        return [
            query('id').notEmpty().withMessage('отсутствует id'),
            query('id').custom(id => {
                if(!id) return

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
            body('id').custom(id => {
                console.log(id)
                return User?.findOne({
                    where: {id}
                }).then((user) => {
                    if(!user) {
                        return Promise.reject(`User'a с id - ${id} нет`)
                    }
                })
            }),
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
