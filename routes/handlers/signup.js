import { validateUserData } from './../helpers/index'
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

async function signup (req, res) {
    try {
        const { username, password, name } = req.body;
        const isValidData = await validateUserData({ username, password, name, forSignUp: true });

        if(!isValidData)
            return res.status(400).send('Bad Request');
        const hashPassword = await hash(password, 10);

        const createdUser = await global.USERS.create({username, password: hashPassword, name}, {returning: true})
        const token = jwt.sign({ id: createdUser.get('id'), username: createdUser.get('username') }, process.env.JWTSECRETKEY);
        res.send({userData: {username, name}, token});
    } catch (e) {
        res.status(500).send('Something broke!');
    }

}


export default {
    method: 'post',
    route: '/signup',
    handler: signup
}