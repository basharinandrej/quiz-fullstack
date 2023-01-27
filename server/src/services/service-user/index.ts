import {User, Result, Token} from '#models/index'
import {UserModel} from '#models/types'
import { ApiError } from '#middlewares/api-error-middleware'
import bcrypt from 'bcrypt'
import {Response, NextFunction} from 'express'
import { 
    IRequestGetAllUsers,
    IRequestGetOneUser,
    IRequestLogin,
    IRequestRegistration,
    IRequestDeleteUser,
    IRequestUpdateUser,
    IRequestLogoutUser
} from '#controllers/controller-user/types'
import { isUserGuard } from '#guards'
import {serviceToken} from '#services/service-token'
import { Role } from '#common/types/types'
import { extractRefreshToken } from '#common/utils/extractToken'
import { UserDto } from '#dto/dto-user'
import { StatisticsDto } from '#dto/dto-statistics'
import { serviceStatistics } from '#services/service-statistics'

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
        
        const statistics = await serviceStatistics.create(user.id, res, next);
        const statisticsDto = statistics && new StatisticsDto(statistics)

        const userDto = new UserDto({...req.body, id: user.dataValues.id})
        const {accessToken, refreshToken} = serviceToken.generateTokens({...userDto})
        await serviceToken.saveToken(refreshToken, user.dataValues.id)

        res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
        res.send({
            accessToken,
            user: {
                ...userDto
            },
            statistics: {
                ...statisticsDto
            }
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
            const userDto = new UserDto(candidate)
            const {accessToken, refreshToken} = serviceToken.generateTokens({...userDto})

            await serviceToken.saveToken(refreshToken,  candidate.id)
    
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json({
                accessToken
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
            const userDto = new UserDto(candidate)
            res.send(userDto)
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

        const rowsForClient = users?.rows.map((user) => new UserDto(user))
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

        if(result) {
            res.clearCookie('refreshToken');
            res.status(200).json('ok')
        } else {
            res.status(500).json(result)
        }
    }

    async update(req: IRequestUpdateUser, res: Response) {
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

            const userDto = new UserDto(updatedUser)
            res.status(200).json(userDto)
        } else {
            res.status(500).json(result)
        }
    }

    async logout(req: IRequestLogoutUser, res: Response, next: NextFunction) {
        const refreshToken = req.headers.cookie && extractRefreshToken(req.headers.cookie)
        if(!refreshToken) return

        refreshToken && serviceToken.validationToken(refreshToken, next)
  
        const result = await serviceToken.dropToken(refreshToken)

        if(result) {
            res.clearCookie('refreshToken');
            res.status(200).json('ok')
        } else {
            res.status(500).json(result)
        }
    }
}

export const serviceUser = new ServiceUser()