const User = require('./models').User;
const List = require('./models').List;
const Member = require('./models').Member;
const bcrypt = require('bcryptjs');

module.exports = {
    createUser(newUser, callback){
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            email: newUser.email,
            username: newUser.username,
            password: hashedPassword
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },

    showLists(userId, callback) {
        let userLists;
        let userMemberships;
        List.findAll({
            where: {
                userId: userId
            },
            order: [
                ['id', 'ASC']
            ]
        })
        .then((userLists) => {
            userLists = userLists;
            Member.findAll({
                where: {
                    userId: userId
                },
                include: [List],
                order: [
                    ['id', 'ASC']
                ]
            })
            .then((userMemberships) => {
                callback(null, userLists, userMemberships);
            })
            .catch((err) => {
                callback(err);
            })
        })
        .catch((err) => {
            callback(err);
        })
    }
}