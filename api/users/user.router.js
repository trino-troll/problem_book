import { getUser, getAllUsers, updateUser, deleteUser, changePassword } from './user.controller.js';
import roleMiddleware from '../../middleware/roleMiddleware.js'
import { Router } from 'express';
const router = Router();

// router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch('/:id/changepass', changePassword)

export default router;

