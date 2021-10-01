const app = require('./app');
const db = require('./mongoosedb');

db.init();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});