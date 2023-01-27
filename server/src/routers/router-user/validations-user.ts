import { body, query, header, Meta, cookie } from 'express-validator';
import { User } from '#models/index'
import jwt from 'jsonwebtoken';
import { isPayloadTokenGuard} from '#guards'
import {Role} from '#common/types/types'
import {toNumber} from '#common/utils/toNumber'
import {checkIsValidRole} from '../../common/utils/checkIsValidRole'
import {IRequestDeleteUser} from '#controllers/controller-user/types'
import {serviceToken} from '#services/service-token'



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

    logoutChains() {
        return [
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
                    if(!user?.dataValues.id) {
                        return Promise.reject(`User'a с id - ${id} нет`)
                    }
                })
            }),
            cookie('refreshToken').custom( async (token, {req}: Meta) => {
                const {id} = (req as IRequestDeleteUser)?.query

                try {
                    const decode = serviceToken.validationToken(token)
                    if(!isPayloadTokenGuard(decode)) return 

                    if(decode.role === Role.ADMIN) {
                        return true
                    } else {
                        // role === USER
                        if(toNumber(decode.id) === toNumber(id)) {
                            const user = await User?.findOne({
                                where: {
                                    id
                                }
                            })
                            if(!user?.dataValues?.id) {
                                return Promise.resolve(`нет юзера с id ${id}`)
                            }                               
                            if(toNumber(user?.dataValues?.id) === toNumber(id)){
                                return Promise.resolve(true)
                            }
                        } else {
                            return Promise.reject('Другого пользователя может удалить только ADMIN')
                        }
                    }
                } catch (error) {
                    return Promise.reject(error);
                }            
            }),
        ]
    },

    updateChains() {
        return [
            body('id').notEmpty().withMessage('uncorrect value').trim(),
            header('authorization').custom( async (value, {req}) => {
                const {id} = req.body

                const token = value.split(' ')[1]
                if(!token) return Promise.reject('Токена нет');

                const decode = jwt.verify(token, process.env.SECRET_KEY || '')

                if(!isPayloadTokenGuard(decode)) return 

                if(decode.role === Role.ADMIN) {
                    if(req.body.role) {
                        if(!checkIsValidRole(req.body.role)) {
                            return Promise.reject(`Неверная роль ${req.body.role}`)
                        }
                    }
                    return true
                } else {
                    // role === USER
                    if(toNumber(decode.id) === toNumber(id)) {
                        const user = await User?.findOne({
                            where: {
                                id
                            }
                        })
                        if(!user?.dataValues?.id) {
                            return Promise.resolve(`нет юзера с id ${id}`)
                        }
                        if(req.body.role) {
                            return Promise.reject('Редактировать роль может только ADMIN')
                        }                                 
                        if(toNumber(user?.dataValues?.id) === toNumber(id)){
                            return Promise.resolve(true)
                        } else {
                            return Promise.reject('Другого пользователя может редактировать только админ')
                        }
                    } else {
                        return Promise.reject('Другого пользователя можт редактировать только админ')
                    }
                }
            
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
