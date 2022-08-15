const { connect, disconnect } = require('../config/db.config');
const { User } = require('../model/user.model');
const logger = require('../logger/api.logger');
const sendData = require('./sendData')

class UserRepository {

    constructor() {
        connect();
    }

    async getUsers() {
        const users = await User.find({});
        //console.log('users:::', users);
        return users;
    }

    async createUser(user) {
        let data = {};
        try {
            data = await User.create(user);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateUser(user) {
        let data = {};
        try {
            data = await User.findOneAndUpdate({_id: user._id, serial_no: user.serial_no}, {
                name: user.name,
                phone_number: user.phone_number,
                email: user.email,
                hobbies: user.hobbies
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteUser(userId) {
        let data = {};
        try {
            data = await User.deleteOne({_id : userId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }
    
    async deleteAllSelectedUser(userId) {
        let data = {};
        try {
            data = await User.deleteMany({_id : userId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

    async sendData(req, res) {    
        return await sendData.mailData(req, res);
    }

}

module.exports = new UserRepository();