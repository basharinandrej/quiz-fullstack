export interface IReqCreateQuiz extends IReqQuestion, IReqHint, IReqAnswers {
    title: string
    timer?: number
    recipientId: number
}

interface IReqQuestion {
    textQuestion: string
}

interface IReqHint {
    textHint?: string
}

export interface IReqAnswer {
    textAnswer: string
    isRightAnswer: boolean
}

export interface IReqAnswers {
    answers: Array<IReqAnswer>
}