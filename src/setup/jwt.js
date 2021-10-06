const jwt = require('jsonwebtoken');

module.exports = {
    sign: payload => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 5000 }),
    verify: token => jwt.verify(token, process.env.JWT_SECRET)
}