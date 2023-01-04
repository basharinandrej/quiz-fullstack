import {Request, Response} from 'express'
import { Result } from '#models/index'

class ServicesResult {
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

    async getAll(req: Request, res: Response) {

    }
}

export const servicesResult = new ServicesResult()