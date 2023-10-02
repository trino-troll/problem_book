import pool from '../../database.js';

export const create = (data) => {
    return pool.query(
        `INSERT INTO users (first_name, last_name, phone, password, email, role_id)
        VALUE (?, ?, ?, ?, ?, ?)`,
        [data.first_name, data.last_name, data.phone, data.password, data.email, data.role_id]);
}

export const getUsers = () => {
    return pool.query(`SELECT * FROM users`)
}

export const getUserByUserId = (id) => {
    return pool.query(`SELECT * FROM users WHERE id = ?`, [id])
}

export const updateUserById = (id, data) => {
    return pool.query(
        `UPDATE users SET first_name = ?, last_name = ?, phone = ?, email = ?, role_id =? WHERE id = ?`,
        [data.first_name, data.last_name, data.phone, data.email, data.role_id, id]
    );
}

export const deleteUserById = (id) => {
    return pool.query(`DELETE FROM users WHERE id = ?`, [id])
}

export const changePass = (id, password) => {
    return pool.query(
        `UPDATE users SET password = ? WHERE id = ?`, [password, id]
    );
}