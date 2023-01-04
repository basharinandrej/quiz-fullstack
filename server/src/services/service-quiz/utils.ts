import { Request, Response } from "express";
import { IAnswer }from './types'
import { Answer } from '#models/index'

export const createAnswers: ICreateAnswers = async (req, res, answers, questionId) => {
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
            return res.status(404).send(`Может быть только один правельный ответ, а у тебя ${totalIsRightAnswers}`)
        }

        let totalCreatedAnswers: IAnswer[] = []
        return new Promise((resolve) => {
            answers.forEach( async (answer) => {
                Answer?.create({
                    text: answer.textAnswer,
                    questionId: questionId,
                    isRightAnswer: answer.isRightAnswer
                })
                totalCreatedAnswers.push(answer)
                if(totalCreatedAnswers.length === answers.length) {
                    resolve(true)
                }
            })
        })
    } else {
        return res.status(404).send('Не корректный массив с ответами')
    }
}

interface ICreateAnswers {
    (req: Request, res: Response, answers: IAnswer[], questionId: number): Promise<boolean | Response>
}