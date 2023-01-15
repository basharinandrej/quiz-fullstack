import {User, Result} from '#models/index'
import {UserModel} from '#models/types'
import { ApiError } from '#middlewares/api-error-middleware'
import bcrypt from 'bcrypt'
import {Response, NextFunction} from 'express'
import { IPayloadToken, IUserForClient } from './types'
import { IRequestGetAllUsers, IRequestGetOneUser, IRequestLogin, IRequestRegistration } from '#controllers/controller-user/types'
import { isUserGuard } from '#guards'
import { Role } from '../../common/types/types'
import { createToken } from './utils'
import { validationResult } from "express-validator";

class ServiceUser {
    async registration(req: IRequestRegistration, res: Response, next: NextFunction) {
        const {name, surname, email, role = Role.USER, password} = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()))
        }

        if(!User) return
        const payloadToken: IPayloadToken = {
            name, surname, email, role
        }

        const candidate = await User.findOne<UserModel>({
            where: {email}
        })

        if(candidate) {
            return next(ApiError.badRequest(`Пользователь с таким email ${email} уже есть`))
        }

        const hashPassword = await bcrypt.hash(password, 9)
        const accessToken = createToken(payloadToken, '30m')
        const refreshToken = createToken(payloadToken, '30d')

        const user = await User.create<UserModel>({
            name,
            surname,
            email,
            password: hashPassword,
            role,
            accessToken,
            refreshToken
        })
        if(!isUserGuard(user)) return 

        res.send({
            refreshToken: user.refreshToken,
            accessToken: user.accessToken
        })
    }

    async login(req: IRequestLogin, res: Response, next: NextFunction) {
        if(!User) return
        const {email, password} = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()))
        }

        const candidate = await User.findOne<UserModel>({
            where: {email}
        })

        if(!candidate) {
            return next(ApiError.badRequest(`Нет пользователя с таким email ${email}, зарегестрируйтесь`))
        }
        
        const isPasswordMatch = await bcrypt.compare(password, candidate.password)

        if(isPasswordMatch) {
            const payloadToken: IPayloadToken = {
                name: candidate.name,
                surname: candidate.surname,
                email: candidate.email,
                role: candidate.role
            }
            const accessToken = createToken(payloadToken, '30m')
            const refreshToken = createToken(payloadToken, '30d')

            await User.update(
                {accessToken, refreshToken},
                { where: { id: candidate.id }}
            )

            res.json({
                accessToken,
                refreshToken
            })
        } else {
            return next(ApiError.forbidden('Неверный пароль'))
        }
    }

    async getOne(req: IRequestGetOneUser, res: Response, next: NextFunction) {
        if(!User) return
        const { id } = req.query

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()))
        }

        const candidate = await User.findOne<UserModel>({
            where: { id },
            include: [{ model: Result }]
        })

        if(candidate?.dataValues.id) {
            const candidateForClient: IUserForClient = {
                id: candidate?.dataValues.id,
                name: candidate?.dataValues.name,
                surname: candidate?.dataValues.surname,
                email: candidate?.dataValues.email,
                role: candidate?.dataValues.role
            }
            res.send(candidateForClient)
        } else {
            return next(ApiError.badRequest('Пользователь не найдён'))
        }
    }

    async getAll(req: IRequestGetAllUsers, res: Response) {
        const { limit = 10, offset = 0 } = req.query

        const users = await User?.findAndCountAll<UserModel>({
            limit,
            offset
        })

        const rowsForClient = users?.rows.map((row) => {
            return {
                id: row.dataValues.id,
                name: row.dataValues.name,
                surname: row.dataValues.surname,
                email: row.dataValues.email,
                role: row.dataValues.role,
            }
        })
        const userForClient = {
            ...users,
            rows: rowsForClient
        }
        res.send(userForClient)
    }
}

export const serviceUser = new ServiceUser()