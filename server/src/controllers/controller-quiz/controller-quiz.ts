import { Request, Response } from "express";
import { User, Quiz } from '../../models/index'
import { isPayloadTokenGuard, isUserGuard } from '../../common/guards/guards'
import { IReqQuizAll } from './types'
import jwt from 'jsonwebtoken';

class ControllerQuiz {
    async quizAll(req: Request<IReqQuizAll>, res: Response) {
        const { id, recipient, author } = req.query

        try {
            const token = req.headers.authorization?.split(' ')[1]
            if(!token) {
                return res.status(404).send('Heт токена доступа')
            }
            jwt.verify(token, process.env.SECRET_KEY || '', async (err, decode: any) => {
                if(err) {
                    return res.status(404).send(`${err}`)
                }
                if(!isPayloadTokenGuard(decode)) return 

                
                if(recipient) {
                    const quizzes = await Quiz?.findAndCountAll({
                        where: {recipientId: id}
                    })
                    res.send(quizzes)
                }else if(author) {
                    const quizzes = await Quiz?.findAndCountAll({
                        where: {userId: id}
                    })
                    res.send(quizzes)
                }
            })

        } catch (error) {
            res.send(error)
        }
    }
    async create(req: Request, res: Response) {
        const {title, timer = null, recipientId} = req.body
        
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if(!token) {
                return res.status(404).send('Heт токена доступа')
            }

            jwt.verify(token, process.env.SECRET_KEY || '', async (err, decode: any) => {
                if(err) {
                    return res.status(404).send(`${err}`)
                }
                if(!isPayloadTokenGuard(decode)) return 

                const user = await User?.findOne({
                    where: {email: decode?.email}
                })
                if(!isUserGuard(user)) {
                    return res.status(404).send(`Нет пользователя с таким email`)
                }

                const quiz = await Quiz?.create({
                    title, 
                    timer, 
                    userId: user.id,
                    recipientId
                })

                res.send(quiz)
            })
        } catch (error) {
            res.send(error)
        }
    }
}

export default new ControllerQuiz()