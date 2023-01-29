import { Answer } from '#models/index'
import { AnswerModel } from '#models/types'
import {IRequestCreateAnswer, IRequestUpdateAnswer, IRequestGetAnswers} from '#controllers/controller-answer/types'
import { Response } from 'express'
import {AnswerDto} from '#dto/dto-answer'

class ServiceAnswer {
    async create(req: IRequestCreateAnswer, res: Response) {
        const {text, questionId, isRightAnswer} = req.body

        const answer = await Answer?.create<AnswerModel>({
            text,
            questionId,
            isRightAnswer
        })
        if(!answer) return
        res.send({...new AnswerDto(answer)})
    }

    async update(req: IRequestUpdateAnswer, res: Response) {
        const {id, text, questionId, isRightAnswer} = req.body
        const result = await Answer?.update(
            {text,questionId,isRightAnswer},
            {where: {id}  
        })

        res.send(result)
    }

    async get(req: IRequestGetAnswers, res: Response) {
        const {limit = 10, offset = 0, questionId} = req.query

        let answers: { rows: AnswerModel[]; count: number; } | undefined | null = null
        if(questionId) {
            answers = await Answer?.findAndCountAll({
                limit, offset, where: {questionId}
            })
        } else {
            answers = await Answer?.findAndCountAll({
                limit, offset
            })
        }

        const answersDto = answers?.rows.map((answer) => {
            return  {...new AnswerDto(answer)}
        })
        res.send({
            ...answers,
            rows: answersDto
        })
    }
}

export default new ServiceAnswer()