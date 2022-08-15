const userService  = require('../service/user-service');
const logger = require('../logger/api.logger');

class UserControl {

    async getUsers() {
        logger.info('Controller: getUsers')
        return await userService.getUsers();
    }

    async createUser(user) {
        logger.info('Controller: createUser', user);
        return await userService.createUser(user);
    }

    async updateUser(user) {
        logger.info('Controller: updateUser', user);
        return await userService.updateUser(user);
    }

    async deleteUser(userId) {
        logger.info('Controller: deleteUser', userId);
        return await userService.deleteUser(userId);
    }

    async deleteAllSelectedUser(userId) {
        logger.info('Controller: deleteAllSelectedUser', userId);
        return await userService.deleteAllSelectedUser(userId);
    }

    async sendData(req, res) {
        //logger.info('Controller: sendData', data);
        return await userService.sendData(req, res);
    }
}
module.exports = new UserControl();