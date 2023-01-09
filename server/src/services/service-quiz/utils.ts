import { Response, NextFunction } from "express";
import { Answer } from '#models/index'
import { AnswerModel } from '#models/types'
import { ApiError } from "#middlewares/api-error-middleware";

export const createAnswers: ICreateAnswers = async (res, answers, questionId, next) => {
    if(Array.isArray(answers) && answers.length > 0 ) {
        let totalIsRightAnswers = 0
        answers.forEach((answer) => {
            if(answer.isRightAnswer) {
                totalIsRightAnswers++
            } else {
                return
            }
        })
        if(totalIsRightAnswers > 1) {
            return next(ApiError.badRequest(`Может быть только один правельный ответ, а у тебя ${totalIsRightAnswers}`))
        }

        let totalCreatedAnswers: AnswerModel[] = []
        return new Promise((resolve) => {
            answers.forEach( async (answer) => {
                Answer?.create({
                    text: answer.text,
                    questionId: questionId,
                    isRightAnswer: answer.isRightAnswer
                })
                totalCreatedAnswers.push(answer)
                if(totalCreatedAnswers.length === answers.length) {
                    resolve(totalCreatedAnswers)
                }
            })
        })
    } else {
        return res.status(404).send('Не корректный массив с ответами')
    }
}

interface ICreateAnswers {
    (res: Response, answers: AnswerModel[], questionId: number, next: NextFunction): Promise<AnswerModel[] | Response | void>
}