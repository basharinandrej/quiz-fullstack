export interface IReqCreateQuiz extends IReqQuestions, IReqHint {
    title: string
    timer?: number
    recipientId: number
}
interface IReqQuestions {
    questions: Array<IReqQuestion>
}
interface IReqQuestion extends IAnswers {
    textQuestion: string
}

export interface IAnswers {
    answers: Array<IAnswer>
}
export interface IAnswer {
    textAnswer: string
    isRightAnswer: boolean
}


interface IReqHint {
    textHint?: string
}