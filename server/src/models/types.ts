import {Role} from '../common/types/types'
import { Model, CreationOptional, Optional, InferAttributes, InferCreationAttributes } from 'sequelize'


export interface UserModel extends Model<InferAttributes<UserModel>,  InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
    accessToken: string;
    refreshToken: string
}



export interface QuizModel extends Model<InferAttributes<QuizModel>,  InferCreationAttributes<QuizModel>> {
    id: CreationOptional<number>
    title: string
    timer: CreationOptional<number>
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