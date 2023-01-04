import {Router} from 'express'
import { controllerResult } from '#controllers/controller-result'


const router = Router()

router.post('/', controllerResult.create)
router.get('/getOne', controllerResult.getOne)

export const routerResult = router