import express from 'express';
import { createUser, getUser, loginUser, updateUser } from '../controller/userController.js';

const userrouter = express.Router();

userrouter.post('/', createUser);
userrouter.get('/', getUser);
userrouter.put('/:userId', updateUser);
userrouter.post('/login', loginUser);

export default userrouter;
