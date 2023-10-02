import express from 'express';
import cookieParser from 'cookie-parser';

// import { getTask, getTasks, createTask } from './database.js';
import userRouter from "./api/users/user.router.js";
import taskRouter from "./api/tasks/tasks.router.js";
import authRouter from "./api/auth/auth.router.js";
import authMiddleware from "./middleware/authMiddlware.js"
import roleMiddleware from './middleware/roleMiddleware.js'

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/tasks", roleMiddleware([1,2]), taskRouter);  // 1 - админ, 2 - юзер
app.use("/api/users", authMiddleware, userRouter);


app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke')
})


async function startApp () {
    try {
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server is running on port ${process.env.APP_PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}
startApp()
