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
    }
}