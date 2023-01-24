import {User, Result, Token} from '#models/index'
import {TokenModel, UserModel} from '#models/types'
import { ApiError } from '#middlewares/api-error-middleware'
import bcrypt from 'bcrypt'
import {Response, NextFunction} from 'express'
import { IPayloadToken, IUserForClient } from './types'
import { 
    IRequestGetAllUsers,
    IRequestGetOneUser,
    IRequestLogin,
    IRequestRegistration,
    IRequestDeleteUser,
    IRequestUpdateUser
} from '#controllers/controller-user/types'
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
        const candidate = await User.findOne<UserModel>({
            where: {email}
        })

        if(candidate) return
        const hashPassword = await bcrypt.hash(password, 9)

        const user = await User.create<UserModel>({
            name,
            surname,
            email,
            password: hashPassword,
            role,
        })

        const payloadToken: IPayloadToken = {
            name, surname, email, role, id: user.dataValues.id
        }
        const accessToken = createToken(payloadToken, '30m')
        const refreshToken = createToken(payloadToken, '30d')

        const tokens = await Token?.create<TokenModel>({
            accessToken, refreshToken, userId: user.dataValues.id
        })
        if(!isUserGuard(user)) return 

        res.send({
            refreshToken: tokens?.dataValues.refreshToken,
            accessToken: tokens?.dataValues.accessToken
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

        if(!candidate) return
        
        const isPasswordMatch = await bcrypt.compare(password, candidate.password)

        if(isPasswordMatch) {
            const payloadToken: IPayloadToken = {
                id: candidate.id,
                name: candidate.name,
                surname: candidate.surname,
                email: candidate.email,
                role: candidate.role
            }
            const accessToken = createToken(payloadToken, '30m')
            const refreshToken = createToken(payloadToken, '30d')

            await Token?.update(
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

    async delete(req: IRequestDeleteUser, res: Response, next: NextFunction) {
        const { id } = req.query

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()))
        }

        const result = await User?.destroy({
            where: {
                id
            }
        })

        result 
            ? res.status(200).json(result)
            : res.status(500).json(result)
    }

    async update(req: IRequestUpdateUser, res: Response, next: NextFunction) {
        const {id, name, surname } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()))
        }

        const result = await User?.update(
            { name, surname }, 
            {
                where: {
                    id
                }
            }
        );

        if(result) {
            const updatedUser = await User?.findOne(
                {where: {id}}
            )
            res.status(200).json({
                id: updatedUser?.id,
                name: updatedUser?.name,
                surname: updatedUser?.surname,
                email: updatedUser?.email,
                role: updatedUser?.role
            })
        } else {
            res.status(500).json(result)
        }

    }
}

export const serviceUser = new ServiceUser()