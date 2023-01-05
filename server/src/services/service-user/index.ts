import {User, Result} from '#models/index'
import {UserType} from '#models/types'
import bcrypt from 'bcrypt'
import {Request, Response} from 'express'
import { IPayloadToken, IBodyRegistration } from './types'
import { IRequestGetAllUsers } from '../../controllers/controller-user/types'
import { isUserGuard } from '../../common/guards/guards'
import { createToken } from './utils'

class ServiceUser {
    async registration(req: Request, res: Response, body: IBodyRegistration) {
        const {name, surname, email, role, password} = body

        if(!User) return
        const payloadToken: IPayloadToken = {
            name, surname, email, role
        }

        const candidate = await User.findOne({
            where: {email}
        })

        if(candidate) {
            return res.status(404).send(`Пользователь с таким email ${email} уже есть`)
        }

        const hashPassword = await bcrypt.hash(password, 9)
        const accessToken = createToken(payloadToken, '30m')
        const refreshToken = createToken(payloadToken, '30d')

        const user = await User.create({
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

    async login(req: Request, res: Response, email: string, password: string) {
        if(!User) return

        const candidate = await User.findOne({
            where: {email}
        })

        if(!candidate) {
            return res.status(404).send(`Нет пользователя с таким email ${email}, зарегестрируйтесь`)
        }

        if(!isUserGuard(candidate)) {
            const emptyFields: string[] = []
            
            for(let key in candidate.dataValues) {
                if( candidate.dataValues[key] === null) {
                    emptyFields.push(key)
                }
            }
            return res.status(404).send(`пользователь с таким login не корректен. Поле(я) ${emptyFields.join(',')} пусты`)
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
            return res.status(404).send(`Неверный пароль`)
        }
    }

    async getOne(req: Request<{id: number}>, res: Response) {
        if(!User) return
        const { id } = req.query

        const candidate = await User.findOne({
            //@ts-ignore
            where: { id },
            include: [{ model: Result }]
        })

        res.send(candidate)
    }

    async getAll(req: IRequestGetAllUsers, res: Response) {
        const { limit = 10, offset = 0 } = req.query

        const users = await User?.findAndCountAll<UserType>({
            limit,
            offset
        })

        const rowsForClient = users?.rows.map((row) => {
            return {
                id: row.dataValues.id,
                name: row.dataValues.name,
                surname: row.dataValues.surname,
                email: row.dataValues.email,
                role: row.dataValues.row,
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