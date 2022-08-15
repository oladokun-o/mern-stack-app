const userRepository  = require('../repository/user');

class UserService {

    constructor() {}

    async getUsers() {
        return await userRepository.getUsers();
    }

    async createUser(user) {
        return await userRepository.createUser(user);
    }

    async updateUser(user) {
        return await userRepository.updateUser(user);
    }

    async deleteUser(userId) {
        return await userRepository.deleteUser(userId);
    }

    async deleteAllSelectedUser(userId) {
        return await userRepository.deleteAllSelectedUser(userId);
    }

    async sendData(req, res) {
        return await userRepository.sendData(req, res);
    }

}

module.exports = new UserService();