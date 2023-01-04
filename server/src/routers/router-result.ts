import {Router} from 'express'
import { controllerResult } from '#controllers/controller-result'


const router = Router()

router.post('/', controllerResult.create)
router.get('/', controllerResult.getAll)

export const routerResult = router