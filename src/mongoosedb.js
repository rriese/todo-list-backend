const mongoose = require('mongoose');

const user = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const database = process.env.MONGO_DB_DATABASE;
const serverName = process.env.MONGO_DB_SERVER;

module.exports = {
    init: () => {
        mongoose.
            connect(
                `mongodb+srv://${user}:${password}@${serverName}/${database}?retryWrites=true&w=majority`
            )
            .then((res) => console.log(`Connection succesfully to database`))
            .catch((error) => console.log(`Error in DB connection ${error}`));
    }
}