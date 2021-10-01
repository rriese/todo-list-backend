const express = require("express");
const router = require("./routers/index");
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

const indexRouter = require('./routers/index');
const todoRouter = require('./routers/todo');

app.use('/', indexRouter);
app.use('/todo', todoRouter);

router.get('/', (req, res) => {
    res.send('TODO API');
})

module.exports = app;