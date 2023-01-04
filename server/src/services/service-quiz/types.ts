export interface IReqCreateQuiz extends IReqQuestions {
    title: string
    timer?: number
    recipientId: number
}
interface IReqQuestions {
    questions: Array<IReqQuestion>
}
interface IReqQuestion extends IAnswers, IHint {
    textQuestion: string
}

export interface IAnswers {
    answers: Array<IAnswer>
}
export interface IAnswer {
    textAnswer: string
    isRightAnswer: boolean
}


interface IHint {
    textHint?: string
    questionId: number
}