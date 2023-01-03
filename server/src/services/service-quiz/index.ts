import { Request, Response } from "express";
import { Quiz, User } from '#models/index'
import { IReqQuizAll } from '#controllers/controller-quiz/types'
import { isPayloadTokenGuard, isUserGuard } from '../../common/guards/guards'
import jwt from 'jsonwebtoken';

class ServiceQuiz {

    async getQuizzesAll(req: Request<IReqQuizAll>, res: Response) {
        const { recipientId, authorId } = req.query
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            return res.status(404).send('Heт токена доступа')
        }
        if(!recipientId && !authorId) {
            return res.status(404).send(`Одно из полей обязательно: recipient, author`)
        }
        jwt.verify(token, process.env.SECRET_KEY || '', async (err, decode: any) => {
            if(err) {
                return res.status(404).send(`${err}`)
            }
            if(!isPayloadTokenGuard(decode)) return 

            
            if(recipientId) {
                const quizzes = await Quiz?.findAndCountAll({
                    where: {recipientId}
                })
                res.send(quizzes)
            } else if(authorId) {
                const quizzes = await Quiz?.findAndCountAll({
                    where: {userId: authorId}
                })
                res.send(quizzes)
            } 
        })
    }

    async createQuiz(req: Request, res: Response) {

        const {title, timer = null, recipientId} = req.body

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
    }
}

export const serviceQuiz = new ServiceQuiz()