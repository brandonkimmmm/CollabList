const User = require('./models').User;
const List = require('./models').List;

module.exports = {
    createList(newList, callback) {
        return List.create({
            name: newList.name,
            userId: newList.userId
        })
        .then((list) => {
            callback(null, list);
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
            callback(null, list);
        })
        .catch((err) => {
            callback(err);
        });
    }
}