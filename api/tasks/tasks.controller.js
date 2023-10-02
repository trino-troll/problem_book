import { getAll, getById, create, update, deleteTask } from './tasks.service.js';

// получение задач (много)
export const getTasks = async (req, res) => {
    try {
        const [tasks] = await getAll();
        res.json({
            success: true,
            data: tasks})
    } catch (e) {
        return res.json({
            success: false,
            message: "Не удалось получить задачи",
            error: e.message
        })
    }
    
}

// получение задачи (одна)
export const getTask = async (req, res) => {
    const id = req.params.id
    try {
        const [task] = await getById(id)
        if (task.length === 0) {
            throw new Error(`Нет задачи с id = ${id}`)
        } 
        res.json({
            success: true,
            data: task[0]
        })
    } catch (e) {
        return res.json({
            success: false,
            message: "Не удалось получить искомую задачу",
            error: e.message
        })
    }
}

// создание задачи
export const createTask = async (req, res) => {
    const body = req.body
    try {
        const [task] = await create(body)
        return res.json({
            success: true,
            data: task[0]})
    } catch(e) {
        return res.json({
            success: false,
            message: "Не удалось создать задачу",
            error: e.message
        })
    }
}

// обновление задачи
export const updateTask = async (req, res) => {
    const id = req.params.id
    const body = req.body 
    try {
        const [checkTask] = await getById(id)
        if (checkTask.length === 0) {
            throw new Error(`Нет задачи с id = ${id}`)
        }
        await update(id, body)
        const [task] = await getById(id)
        res.json({
            success: true,
            data: task[0]
        })
    } catch(e) {
        return res.json({
            success: true,
            message: "Не удалось обновить задачу",
            error: e.message
        }) 
    }
}

// удаление задачи
export const delTask = async (req, res) => {
    const id = req.params.id
    try {
        const [checkTask] = await getById(id)
        if (checkTask.length === 0) {
            throw new Error(`Нет задачи с id = ${id}`)
        }
        await deleteTask(id);
        return res.json({
            success: true, 
            message: 'Задача удалена'})
    } catch(e) {
        return res.json({
            success: false,
            message: "Не удалось удалить задачу",
            error: e.message
        })
    }
} 
