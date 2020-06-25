import {validateUserData} from "../helpers";
import jwt from "jsonwebtoken";
import { hash, compare } from 'bcrypt';

async function login (req, res) {
    try {
        const { username, password } = req.body;
        const isValidData = await validateUserData({ username, password });

        if(!isValidData)
            return res.status(400).send('Incorrect username/password');


        const createdUser = await global.USERS.findOne({where: {username}});
        if(!createdUser)
            return res.status(400).send('Incorrect username/password');

        const isRightPassword = await compare(password, createdUser.get('password'));
        if(!isRightPassword)
            return res.status(400).send('Incorrect username/password');

        const token = jwt.sign({ id: createdUser.get('id'), username: createdUser.get('username') }, process.env.JWTSECRETKEY);
        res.send({userData: {username: createdUser.get('username'), name: createdUser.get('name')}, token});
    } catch (e) {
        console.error(e);
        res.status(500).send('Something broke!');
    }

}


export default {
    method: 'post',
    route: '/login',
    handler: login
}