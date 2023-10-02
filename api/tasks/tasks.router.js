import { getTasks, getTask, createTask, updateTask, delTask } from './tasks.controller.js'
import Router from 'express';
const router = Router();

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', delTask);

export default router;
