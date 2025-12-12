import express from 'express';
import { createUser, getUser, loginUser } from '../controller/userController.js';

const userrouter = express.Router();

userrouter.post('/', createUser);
userrouter.get('/', getUser);
userrouter.post('/login', loginUser);

export default userrouter;
