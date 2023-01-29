import {IRequestCreateQuestion, IRequestUpdateQuestion} from '#controllers/controller-question/types'
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

    async update(req: IRequestUpdateQuestion, res: Response) {
        const {id, text, quizId} = req.body
        const result = await Question?.update(
            {text,quizId},
            {where: {id}  
        })

        res.send(result)
    }
}

export default new ServiceQuestion