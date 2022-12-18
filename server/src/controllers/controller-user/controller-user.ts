import {User} from '../../models/index'
import {Request, Response} from 'express'
import { IPayloadToken } from './types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();



class ControllerUser {
    async registration(req: Request, res: Response) {
        const {
            name,
            surname,
            email,
            role,
            password
        } = req.body
        try {
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

        } catch (error) {
            console.log('error', error)
        }
    }
}

export default new ControllerUser()