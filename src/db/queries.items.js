const User = require('./models').User;
const List = require('./models').List;
const Member = require('./models').Member;
const Item = require('./models').Item;

module.exports = {
    createItem(newItem, callback) {
        return Member.findAll({
            where: {
                userId: newItem.userId,
                listId: newItem.listId
            }
        })
        .then((member) => {
            if(member.length === 0) {
                let err = {
                    errors: [
                        {
                            'message': 'must be a member to create an item'
                        }
                    ]
                }
                callback(err);
            } else {
                Item.create({
                    listId: newItem.listId,
                    name: newItem.name,
                    amount: newItem.amount
                })
                .then((item) => {
                    callback(null, item);
                })
                .catch((err) => {
                    callback(err);
                })
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

    showItems(listId, callback) {
        return Item.findAll({
            where: {
                listId: listId
            }
        })
        .then((items) => {
            callback(null, items);
        })
        .catch((err) => {
            callback(err);
        })
    }
}