const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        select: false,
        set: value => 
            crypto
                .createHash('md5')
                .update(value)
                .digest('hex')
    }
});

module.exports = User = mongoose.model('users', userSchema)