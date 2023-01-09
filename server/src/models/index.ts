import { DataTypes } from 'sequelize'
import {instanceSequelize} from '../db/index'
import { UserModel, StatisticsModel, QuestionModel, QuizModel, AnswerModel, HintModel } from './types'
import {Role} from '../common/types/types'

const Quiz = instanceSequelize?.define<QuizModel>('quiz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timer: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const Question = instanceSequelize?.define<QuestionModel>('question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Answer = instanceSequelize?.define<AnswerModel>('answer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isRightAnswer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    questionId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Hint = instanceSequelize?.define<HintModel>('hint', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },   
    questionId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Result = instanceSequelize?.define('result', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalRightAnswers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

const User = instanceSequelize?.define<UserModel>('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(Role.USER, Role.ADMIN),
        allowNull: false,
        defaultValue: Role.USER
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Statistics = instanceSequelize?.define<StatisticsModel>('statistics', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalQuizzesSolved: {
        type: DataTypes.INTEGER
    },
    totalQuizzesMade: {
        type: DataTypes.INTEGER
    },
    totalRightAnswers: {
        type: DataTypes.INTEGER
    },
    totalQuestions: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})


if(Question && Quiz && Answer && Hint && Result && User && Statistics) {
    Quiz.hasMany(Question)
    Question.belongsTo(Quiz)

    Question.hasMany(Answer)
    Answer.belongsTo(Question)

    Question.hasOne(Hint)
    Hint.belongsTo(Question)

    Quiz.hasMany(Result)
    Result.belongsTo(Quiz)

    User.hasMany(Result)
    Result.belongsTo(Quiz)

    User.hasMany(Quiz)
    Quiz.belongsTo(User, {
        foreignKey: 'recipientId'
    })

    User.hasOne(Statistics)
    Statistics?.belongsTo(User)
}

export {Question, Quiz, User, Answer, Hint, Result, Statistics}