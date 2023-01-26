import { UserModel, QuestionModel, QuizModel } from '#models/types'
import { IPayloadToken } from '#services/service-user/types'
import {AnswerModel} from '#models/types'

export function isUserGuard(user: any): user is UserModel {
    if(
        user?.id && user?.name 
        && user?.surname && user?.email 
        && user?.password && user?.role 
    ) {
        return true
    }
    return false
}

export function isPayloadTokenGuard(payload: any): payload is IPayloadToken {
    if(
        payload.id &&
        payload?.name 
        && payload?.surname && payload?.email 
        && payload?.role 
    ) {
        return true
    }
    return false
}

export function isQuizGuard(quiz: any): quiz is QuizModel {
    if(
        quiz.id && quiz.title && quiz.userId && quiz.recipientId
    ) {
        return true
    }
    return false
}

export function isQuestionGuard(question: any): question is QuestionModel {
    if(
        question.id && question.text && question.quizId
    ) {
        return true
    }
    return false
}

export function isAnswerGuard(answer: AnswerModel): answer is AnswerModel {
    if(
        typeof answer.isRightAnswer === 'boolean' && answer.text
    ) {
        return true
    }
    return false
}