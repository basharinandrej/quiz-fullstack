import { body, query, header } from 'express-validator';
import { User } from '#models/index'
import jwt from 'jsonwebtoken';
import { isPayloadTokenGuard} from '#guards'
import {Role} from '../../common/types/types'

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
            header('authorization').custom((value, {req}) => {
                const token = value.split(' ')[1]
                const {id, myEmail} = req.body
                if(!token) Promise.reject('Токена нет');

                return jwt.verify(token,
                    process.env.SECRET_KEY || '', 
                    async (err: jwt.VerifyErrors | null, decode: any): Promise<boolean | string | void> => {
                        if(err) {
                            return Promise.reject(err)
                        }
                        if(isPayloadTokenGuard(decode)) {
                            if(decode.role === Role.ADMIN) {
                                return Promise.resolve(true)
                            } else {
                                if(decode.email === myEmail) {
                                    return User?.findOne({
                                        where: {
                                            email: myEmail
                                        }
                                    })
                                    .then((user) => {       
                                        if(!user?.dataValues?.id) {
                                            return Promise.resolve(`нет юзера с email ${myEmail}`)
                                        }                                 
                                        if(+user?.dataValues?.id === +id){
                                            return Promise.resolve(true)
                                        } else {
                                            return Promise.reject('Другого пользователя может редактировать только админ')
                                        }
                                    })
                                } else {
                                    return Promise.reject('Другого пользователя можт редактировать только админ')
                                }
                            }
                        } 
                    })
            }),
            body('id').custom(id => {
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
                        return Promise.reject('name должен быть больше 1 символа')
                    }
                }
                return true
            }),
            body('surname').custom(surname => {
                if(surname) {
                    if(surname.length <= 1) {
                        return Promise.reject('surname должен быть больше 1 символа')
                    }
                }
                return true
            }),
        ]
    }
}
