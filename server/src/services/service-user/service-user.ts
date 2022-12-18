import {User} from '../../models/index'
import bcrypt from 'bcrypt'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { IPayloadToken, IBodyRegistration } from './types'

class ServiceUser {
    async registration(req: Request, res: Response, body: IBodyRegistration) {
        const {name, surname, email, role, password} = body

        if(!User) return
        const payloadToken: IPayloadToken = {
            name, surname, email, role, password
        }
        const secretString = process.env.SECRET_KEY || ''

        const candidate = await User.findOne({
            where: {email}
        })

        if(candidate) {
            return res.status(404).send(`Пользователь с таким email ${email} уже есть`)
        }

        const hashPassword = await bcrypt.hash(password, 9)
        const accessToken = jwt.sign(
            payloadToken, 
            secretString, 
            { expiresIn: '30m'}
        )
        const refreshToken = jwt.sign(
            payloadToken, 
            secretString, 
            { expiresIn: '30d'}
        )
        const user = await User.create({
            name,
            surname,
            email,
            password: hashPassword,
            role,
            accessToken,
            refreshToken
        })


        res.send({
            refreshToken: user.refreshToken,
            accessToken: user.accessToken
        })
    }
}

export const serviceUser = new ServiceUser()