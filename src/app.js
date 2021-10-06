const express = require("express");
const userService = require('./services/userService');
const jwt = require('./setup/jwt');
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

//Middleware
const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        res.status(401).json({ error: 'Necessary credentials!' });
        return;
    }

    const [, token] = authorization.split(' ');

    try {
        const payload = jwt.verify(token);
        const user = await userService.findUserById(payload.user);
        if (!user) res.status(401);

        next();
    } catch (error) {
        res.status(401).json(error);
    }
}

//Auth
app.post('/signup', async (req, res) => {
    try {
        const createdUser = await userService.add(req.body);
        const { password, ...user } = createdUser.toObject();

        const token = jwt.sign({ user: user.id });

        res.status(201).json({user, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/login', async (req, res) => {
    const authorization = req.headers.authorization;
    if (!authorization) res.status(401).json({error: 'Necessary send credentials'});

    const [, hash] = req.headers.authorization.split(' ');
    const [username, password] = Buffer.from(hash, 'base64')
        .toString()
        .split(':');

    try {
        const user = await userService.findUser(username, password);

        if (!user) res.send(401);

        const token = jwt.sign({ user: user.id });

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(401, error);
    }
})

//Routers
const todoRouter = require('./routers/todo');
app.use('/todo', authMiddleware, todoRouter);

//Generic
app.get('/', (req, res) => {
    res.send('TODO API');
})

module.exports = app;