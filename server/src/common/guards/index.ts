import { UserModel, QuestionModel, QuizModel } from '#models/types'
import { IPayloadToken } from '#services/service-user/types'
import { IAnswer } from '../../services/service-quiz/types';

export function isUserGuard(user: any): user is UserModel {
    if(
        user?.id && user?.name 
        && user?.surname && user?.email 
        && user?.password && user?.role 
        && user?.accessToken && user?.refreshToken
    ) {
        return true
    }
    return false
}

export function isPayloadTokenGuard(payload: any): payload is IPayloadToken {
    if(
        payload.name 
        && payload.surname && payload.email 
        && payload.role 
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

export function isAnswerGuard(answer: any): answer is IAnswer {
    if(
        typeof answer.isRightAnswer === 'boolean' && answer.textAnswer
    ) {
        return true
    }
    return false
}