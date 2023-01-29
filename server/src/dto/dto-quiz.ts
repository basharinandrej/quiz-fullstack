import { QuizModel } from '#models/types'

export class QuizDto {
    public id: number;
    public title: string

    constructor(quiz: QuizModel) {
        this.id = quiz.dataValues.id
        this.title = quiz.dataValues.title
    }
}