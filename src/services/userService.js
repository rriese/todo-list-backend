const { response } = require('../app');
const User = require('../models/user');

module.exports = class userService {
    static async add(data) {
        try {
            const response = await new User({
                name: data.name,
                username: data.username,
                password: data.password
            }).save();
            return response;
        } catch (error) {
            console.log(`Error creating user -> ${error}`);
            throw error.message;
        }
    }

    static async findUser(username, password) {
        try {
            const user = await User.findOne({ username, password });
            return user;
        } catch (error) {
            console.log(`Error seraching user -> ${error}`);
            throw error.message;
        }
    }
    
    static async findUserById(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            console.log(`Error seraching user -> ${error}`);
            throw error.message;
        }
    }
}