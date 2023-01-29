import { Answer } from '#models/index'
import { AnswerModel } from '#models/types'
import {IRequestCreateAnswer} from '#controllers/controller-answer/types'
import { Response } from 'express'


class ServiceAnswer {
    async create(req: IRequestCreateAnswer, res: Response) {
        const {text, questionId, isRightAnswer} = req.body
        const result = await Answer?.create<AnswerModel>({
            text,
            questionId,
            isRightAnswer
        })

        res.send(result)
    }
}

export default new ServiceAnswer()