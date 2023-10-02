import pool from '../../database.js'

export const getAll = () => {
    const rows = pool.query(`SELECT * FROM tasks`);
    return rows
}

export const getById = (id) => {
    const rows = pool.query('SELECT * FROM tasks WHERE id = ?', [id])
    return rows
}

export const create = async (data) => {
    const [result] = await pool.query(`
        INSERT INTO tasks (title, content, author, executor)
        VALUES (?, ?, ?, ?)
    `, [data.title, data.content, data.author, data.executor])
    return getById(result.insertId)
} 

export const update = async (id, data) => {
    const [result] = await pool.query(`
    UPDATE tasks SET title = ?, content = ?, author = ?, executor = ? WHERE id = ?`,
    [data.title, data.content, data.author, data.executor, id])
    return result
}

export const deleteTask = (id) => {
    return pool.query('DELETE FROM tasks WHERE id = ?', [id])
}