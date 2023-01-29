import { QuestionModel } from '#models/types'

export class QuestionDto {
    public id: number;
    public text: string
    public quizId: number

    constructor(question: QuestionModel) {
        this.id = question.dataValues.id
        this.text = question.dataValues.text
        this.quizId = question.dataValues.quizId
    }
}