import express, {Express} from 'express'
import dotenv from 'dotenv';
import {instanceSequelize} from './db/index'
import {Quiz, Question} from './models/index'
import router from './routers/index'


dotenv.config();

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', router)

app.post('/api/question', async (req, res) => {
    const { text, quizId } = req.body

    try {
        if(!Question) return
        const question = await Question.create({
            text,
            quizId
        })
        res.send(question)
    } catch (error) {
        console.log('error', error)
    }
})

app.get('/api/question', async (req, res) => {
    try {
        if(!Question) return
        const questions = await Question.findAndCountAll({
            include: [
                {model: Quiz}
            ]
        })
        res.send(questions)
    } catch (error) {
        console.log('error', error)
    }
})

app.listen(PORT, async () => {
    try {
        await instanceSequelize?.sync()
        console.log(`Server started on ${PORT} port...`)

    } catch (error) {
        console.error('Error', error)
    }
})