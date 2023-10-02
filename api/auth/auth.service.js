import pool from '../../database.js';

export const create = (data) => {
    return pool.query(
        `INSERT INTO users (first_name, last_name, phone, password, email, role_id)
        VALUE (?, ?, ?, ?, ?, ?)`,
        [data.first_name, data.last_name, data.phone, data.password, data.email, 2]);
}

export const findPhone = (phone) => {
    return pool.query(`SELECT * FROM users WHERE phone = ?`, [phone])
}

export const getData = (id) => {
    return pool.query('SELECT first_name, last_name, phone, email FROM users WHERE id = ?', [id] )
}