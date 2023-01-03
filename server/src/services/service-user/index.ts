import {User} from '../../models/index'
import bcrypt from 'bcrypt'
import {Request, Response} from 'express'
import { IPayloadToken, IBodyRegistration } from './types'
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
}

export const serviceUser = new ServiceUser()