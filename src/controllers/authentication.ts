import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import {random, authentication} from '../helpers';



export const register = async (req: express.Request, res: express.Response)=> {
    try {
        const {username, email, password} = req.body;
        
        if(!username || !email || !password) return res.sendStatus(400);

        const existeUser = await getUserByEmail(email);
        if(existeUser) return res.sendStatus(400);

        const salt = random();  
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();

    }catch (error) {
        console.log('Erro ao registrar usuario: ', error);
        res.sendStatus(400);
    }
}