const User = require('./models').User;
const List = require('./models').List;
const Member = require('./models').Member;

module.exports = {
    createList(newList, callback) {
        return List.create({
            name: newList.name,
            userId: newList.userId
        })
        .then((list) => {
            Member.create({
                userId: list.userId,
                listId: list.id
            })
            .then((member) => {
                callback(null, list);
            })
            .catch((err) => {
                callback(err);
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

    show(listId, callback) {
        return List.findAll({
            where: {
                id: listId,
            },
            include: [User]
        })
        .then((list) => {
            callback(null, list[0]);
        })
        .catch((err) => {
            callback(err);
        });
    }
}