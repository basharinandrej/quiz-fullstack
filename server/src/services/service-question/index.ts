import {IRequestCreateQuestion, IRequestUpdateQuestion, IRequestGetQuestions} from '#controllers/controller-question/types'
import { Response } from 'express'
import { Question } from '#models/index';
import {QuestionDto} from '#dto/dto-question'
import { QuestionModel } from '#models/types'


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

    async getAll(req: IRequestGetQuestions, res: Response) {
        const {limit = 10, offset = 0, quizId} = req.query

        let answers: { rows: QuestionModel[]; count: number; } | undefined | null = null
        if(quizId) {
            answers = await Question?.findAndCountAll({
                limit, offset, where: {quizId}
            })
        } else {
            answers = await Question?.findAndCountAll({
                limit, offset
            })
        }

        const answersDto = answers?.rows.map((answer) => {
            return  {...new QuestionDto(answer)}
        })
        res.send({
            ...answers,
            rows: answersDto
        })
    }
}

export default new ServiceQuestion