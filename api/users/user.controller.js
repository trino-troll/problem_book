import { create, getUserByUserId, getUsers, updateUserById, deleteUserById, changePass } from './user.service.js';

import { genSaltSync, hashSync, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

//создание пользователя
// export const createUser = async (req, res) => {
//     const body = req.body;
//     try {
//         const salt = genSaltSync(10);
//         body.password = hashSync(body.password, salt);
//         await create(body);
//         return res.json({
//             success: true,
//             message: 'Пользователь создан'
//         })
//     } catch(e) {
//         return res.json({
//             success: false,
//             message: 'Не удалось создать пользователя',
//             error: e.message
//         })
//     }
    
// }

//получение пользователя
export const getUser = async(req, res) => {
    try {
        const id = req.params.id
        const user = await getUserByUserId(id)
        if (user[0].length === 0) {
            throw new Error(`Нет пользователя c id = ${id}`)
        }
        return res.json({
            success: true,
            data: user[0]
        })
    } catch(e) {
        return res.json({
            success: false,
            message: 'Не удалось получить пользователя',
            error: e.message
        })
    }
}

// получение всех пользователей
export const getAllUsers = async(req, res) => {
    try {
        const users = await getUsers()
        return res.json({
            success: true,
            data: users[0]
        })  
    } catch (e) {
        return res.json({
            success: false,
            message: 'Не удалось получить всех пользователей',
            error: e.message
        })
    }
}

//обновление пользователя
export const updateUser = async (req, res) => {
    const id = req.params.id
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    try {
        const user = await getUserByUserId(id)
        if (user[0].length === 0) {
            throw new Error(`Нет пользователя c id = ${id}`)
        }
        await updateUserById(id, body)
        const upUser = await getUserByUserId(id)
        return res.json({
            success: true,
            data: upUser[0]
        })
    } catch(e) {
        return res.json({
            success: false,
            message: 'Не удалось обновить пользователя',
            error: e.message
        })
    }
}

// удаление пользователя
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await getUserByUserId(id)
        if (user[0].length === 0) {
            throw new Error(`Нет пользователя c id = ${id}`)
        }
        await deleteUserById(id)
        return res.json({
            success: true,
            message: 'Пользователь удалён'
        })
    } catch (e) {
        return res.json({
            success: false,
            message: "Не удалось удалить пользователя",
            error: e.message
        })
    }
}

export const changePassword = async (req, res) => {
    const {password, newpassword} = req.body

    try {
        const auth = req.headers.authorization.split(' ')[1]
        if (!auth) {
            throw new Error('Пользователь не авторизован')
        } 
        const decodedAuth = jwt.verify(auth, process.env.SECRET_KEY)
        const id = decodedAuth.id  // id пользователя из токена
        const [user] = await getUserByUserId(id)
        const checkPass = await compare(password, user[0].password)
        if (!checkPass) {
            throw new Error('Неверные данные')
        }
        const newPass = await changePass(id, newpassword)
        res.json({
            success: 1,
            message: 'Пароль изменён'
        })
    } catch(e) {
        res.json({
            success: 0,
            message: 'Введены не верные данные',
            error: e.message
        })
    }
}