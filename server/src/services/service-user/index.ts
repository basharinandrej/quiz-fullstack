import {User, Result, Token} from '#models/index'
import {TokenModel, UserModel} from '#models/types'
import { ApiError } from '#middlewares/api-error-middleware'
import bcrypt from 'bcrypt'
import {Response, NextFunction} from 'express'
import { IPayloadToken } from './types'
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
import { generateTokens } from './utils'
import { UserDto } from '#dto/dto-user'

class ServiceUser {
    async registration(req: IRequestRegistration, res: Response, next: NextFunction) {
        const {name, surname, email, role = Role.USER, password} = req.body

        if(!User) return

        const hashPassword = await bcrypt.hash(password, 9)
        const user = await User.create<UserModel>({
            name,
            surname,
            email,
            password: hashPassword,
            role, 
        })
        if(!isUserGuard(user)) {
            next(ApiError.internal('Не удалось зарегистровать юзера'))
        } 

        const payloadToken: IPayloadToken = {
            name, surname, email, role, id: user.dataValues.id
        }
        const {accessToken, refreshToken} = generateTokens(payloadToken)
        const tokens = await Token?.create<TokenModel>({
            accessToken, refreshToken, userId: user.dataValues.id
        })

        res.send({
            refreshToken: tokens?.dataValues.refreshToken,
            accessToken: tokens?.dataValues.accessToken
        })
    }

    async login(req: IRequestLogin, res: Response, next: NextFunction) {
        if(!User) return
        const {email, password} = req.body

        const candidate = await User.findOne<UserModel>({
            where: {email}
        })
        if(!candidate) return
        
        const isPasswordMatch = await bcrypt.compare(password, candidate.password)
        if(isPasswordMatch) {
            const {accessToken, refreshToken} = generateTokens(new UserDto(candidate))

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

        const candidate = await User.findOne<UserModel>({
            where: { id },
            include: [{ model: Result }]
        })

        if(candidate?.dataValues.id) {
            res.send(new UserDto(candidate))
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

        const rowsForClient = users?.rows.map((row) => new UserDto(row))
        const userForClient = {
            ...users,
            rows: rowsForClient
        }
        res.send(userForClient)
    }

    async delete(req: IRequestDeleteUser, res: Response) {
        const { id } = req.query

        const result = await User?.destroy({
            where: {id}
        })

        result 
            ? res.status(200).json(result)
            : res.status(500).json(result)
    }

    async update(req: IRequestUpdateUser, res: Response, next: NextFunction) {
        const {id, name, surname, role } = req.body

        const result = await User?.update(
            { name, surname, role }, 
            {where: {id}}
        );

        if(result) {
            const updatedUser = await User?.findOne<UserModel>(
                {where: {id}}
            )
            if(!isUserGuard(updatedUser)) return
            
            res.status(200).json(new UserDto(updatedUser))
        } else {
            res.status(500).json(result)
        }

    }
}

export const serviceUser = new ServiceUser()