import {Router} from 'express'
import controllerAnswer from '#controllers/controller-answer'


const router = Router()

router.post('/',
    controllerAnswer.create
)


export const routerAnswer = router