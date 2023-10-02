import jwt from 'jsonwebtoken';

const roleMiddleware = (roles) => { // roles - массив, передается при вызове
    return  (req, res, next) => {
        if (req.method === "OPTIONS") {
            next()
        }


        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.json('Пользователь не авторизован')  // по видео res.redirect('/login')
            }

            const {role: userRoles} = jwt.verify(token, process.env.SECRET_KEY)
            let hasRole = false

            if (roles.includes(userRoles)) {
                hasRole = true
            }
            if (!hasRole) {
                return res.json('У вас нет доступа')
            }

            next();
        } catch(e) {
            console.log(e.message)
            return res.json('Пользователь не авторизован')  // по видео res.redirect('/login')
        }
    }
}  

export default roleMiddleware;