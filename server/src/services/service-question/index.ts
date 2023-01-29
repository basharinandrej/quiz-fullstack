import {IRequestCreateQuestion} from '#controllers/controller-question/types'
import { Response } from 'express'
import { Question } from '#models/index';
import {QuestionDto} from '#dto/dto-question'


class ServiceQuestion {
    async create(req: IRequestCreateQuestion, res: Response) {
        const {text, quizId} = req.body

        const question = await Question?.create({
            text,
            quizId
        })

        if(!question) return
        res.send({...new QuestionDto(question)})
    }
}

export default new ServiceQuestion