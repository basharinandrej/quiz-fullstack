import express, {Express} from 'express'
import dotenv from 'dotenv';
import {instanceSequelize} from './db/index'
import router from './routers/index'


dotenv.config();

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', router)

app.listen(PORT, async () => {
    try {
        await instanceSequelize?.sync()
        console.log(`Server started on ${PORT} port...`)

    } catch (error) {
        console.error('Error', error)
    }
})