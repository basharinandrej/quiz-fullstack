import {Request, Response} from 'express'
import { Result } from '#models/index'

class ServiceResult {
    async create(req: Request, res: Response) {
        const {
            totalRightAnswers,
            totalQuestions,
            rating,
            quizId,
            userId
        } = req.body

        try {
            const result = await Result?.create({
                totalRightAnswers,
                totalQuestions,
                rating,
                quizId,
                userId
            })

            res.send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }

    async getOne(req: Request, res: Response) {
        const {userId, quizId} = req.query

        try {
            if(userId) {
                const result = await Result?.findAndCountAll({
                    where: {userId}
                })
                res.send(result)
            } else if(quizId) {
                const result = await Result?.findOne({
                    where: {quizId}
                })
                res.send(result)
            } else {
                const result = await Result?.findAndCountAll({
                    where: {quizId, userId}
                })
                res.send(result)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export const serviceResult = new ServiceResult()