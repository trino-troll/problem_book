import { create, findPhone, getData } from './auth.service.js';
import { genSaltSync, hashSync, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

// jwt
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role = null) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY, {
        expiresIn: maxAge  // время жизни токена
    });
}


export const signupGet = async (req, res) => {

}

// регистрация нового пользователя
export const signupPost = async (req, res) => {

    const body = req.body;
    try {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        console.log(body)
        const user = await create(body);
        // const token = createToken(user.insertId)
        // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});  // добавление токена в куки
        return res.json({
            success: true,
            message: 'Пользователь создан'
        })
    } catch(e) {
        return res.json({
            success: false,
            message: 'Не удалось создать пользователя',
            error: e.message
        })
    }
}

export const loginGet = async (req, res) => {
    
}

// вход пользователя
export const loginPost = async (req, res) => {
    let {phone, password} = req.body
    phone = phone.trim();
    password = password.trim();
    try {
        if (!phone.length || phone.length !== 12) { //проверка наличия телефона и его длинны
            throw new Error('Не введён номер телефона')
        }
        if (password.length === 0) {        // проверка наличия пароля 
            throw new Error('Не введён пароль')
        } else  if (password.length < 8){   // проверка длинны пароля
            throw new Error('Введён некорректный пароль')
        }

        const [userArr] = await findPhone(phone) // приходит список из одного элемента
        const user = userArr[0]

        if (user) {
            const auth = await compare(password, user.password)  // проверка на совпадение пароли и пароля в БД
            if (auth) {
                const token = createToken(user.id, user.role_id)  // создание токена
                const [userData] = await getData(user.id)
                return res.json({
                    success: true,
                    data: userData[0],
                    token: token
                })
            }
            throw  new Error('Введены не верные данные')
        }
        throw new Error('Введены не верные данные')
    } catch(e) {
        res.json({
            success: false,
            message: 'Не удалось авторизоваться',
            error: e.message
        })
    }
}