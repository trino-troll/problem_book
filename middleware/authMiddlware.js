import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            console.log(e.message)
            return res.json('Пользователь не авторизован') 
        }
        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        next();
    } catch(e) {
        console.log(e.message)
        return res.json('Пользователь не авторизован')
    }
 }

 export default requireAuth;