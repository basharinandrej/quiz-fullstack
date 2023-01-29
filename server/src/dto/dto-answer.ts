import { AnswerModel } from '#models/types'

export class AnswerDto {
    public id: number;
    public text: string
    public isRightAnswer: boolean
    public questionId: number

    constructor(answer: AnswerModel) {
        this.id = answer.dataValues.id
        this.text = answer.dataValues.text,
        this.isRightAnswer = answer.dataValues.isRightAnswer,
        this.questionId = answer.dataValues.questionId
    }
}