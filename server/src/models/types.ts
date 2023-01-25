import {Role} from '../common/types/types'
import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'


export interface UserModel extends Model<InferAttributes<UserModel>,  InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
}



export interface QuizModel extends Model<InferAttributes<QuizModel>,  InferCreationAttributes<QuizModel>> {
    id: CreationOptional<number>
    title: string
    timer?: number | null
    userId: number
    recipientId: CreationOptional<number>
}



export interface QuestionModel extends Model<InferAttributes<QuestionModel>, InferCreationAttributes<QuestionModel>> {
    id: CreationOptional<number>
    quizId: CreationOptional<number>
    text: string
}



export interface StatisticsModel extends Model<InferAttributes<StatisticsModel>, InferCreationAttributes<StatisticsModel>> {
    id: CreationOptional<number>;
    userId: CreationOptional<number>;
    totalRightAnswers: number;
    totalQuestions: number;
    totalQuizzesSolved: number;
    totalQuizzesMade: number;
}



export interface AnswerModel extends Model<InferAttributes<AnswerModel>, InferCreationAttributes<AnswerModel>> {
    id: CreationOptional<number>;
    text: string;
    isRightAnswer: boolean
    questionId: CreationOptional<number>
}



export interface HintModel extends Model<InferAttributes<HintModel>, InferCreationAttributes<HintModel>> {
    id: CreationOptional<number>;
    text: string;
    questionId: CreationOptional<number>
}



export interface ResultModel extends Model<InferAttributes<ResultModel>, InferCreationAttributes<ResultModel>> {
    id: CreationOptional<number>;
    totalRightAnswers: number
    totalQuestions: number
    rating: CreationOptional<number>
    quizId: number
    userId: number
}



export interface TokenModel extends Model<InferAttributes<TokenModel>, InferCreationAttributes<TokenModel>> {
    id: CreationOptional<number>;
    accessToken: string,
    refreshToken: string
    userId: number
}