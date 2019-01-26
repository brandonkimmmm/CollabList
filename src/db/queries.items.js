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
                Item.findAll({
                    where: {
                        name: newItem.name,
                        listId: newItem.listId
                    }
                })
                .then((items) => {
                    if(items.length !== 0) {
                        let err = {
                            errors: [
                                {
                                    'message': 'Item already exists'
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
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

    showItems(id, callback) {
        return Item.findAll({
            where: {
                listId: id
            },
            order: [
                ['id', 'ASC']
            ]
        })
        .then((items) => {
            callback(null, items);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateItem(updatedItem, callback) {
        return Item.findById(updatedItem.id)
        .then((item) => {
            if(!item) {
                let err = {
                    errors: [
                        {
                            'message': 'cannot find item with that id'
                        }
                    ]
                }
                callback(err);
            } else {
                Member.findAll({
                    where: {
                        userId: updatedItem.userId,
                        listId: updatedItem.listId
                    }
                })
                .then((member) => {
                    if(member.length === 0) {
                        let err = {
                            errors: [
                                {
                                    'message': 'must be a member to update an item'
                                }
                            ]
                        }
                        callback(err);
                    } else {
                        let newItem = {
                            name: updatedItem.name,
                            amount: updatedItem.amount,
                            purchased: updatedItem.purchased
                        }
                        item.update(newItem, {
                            fields: Object.keys(newItem)
                        })
                        .then(() => {
                            Item.findAll({
                                where: {
                                    listId: updatedItem.listId
                                },
                                order: [
                                    ['id', 'ASC']
                                ]
                            })
                            .then((items) => {
                                callback(null, items);
                            })
                            .catch((err) => {
                                callback(err);
                            })
                        })
                        .catch((err) => {
                            callback(err);
                        })
                    }
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

    destroyItem(req, callback) {
        return Member.findAll({
            where: {
                listId: req.params.listId,
                userId: req.body.userId
            }
        })
        .then((members) => {
            if(members.length === 0) {
                let err = {
                    errors: [
                        {
                            'message': 'must be a member to delete an item'
                        }
                    ]
                }
                callback(err);
            } else {
                Item.findById(req.params.id)
                .then((item) => {
                    item.destroy()
                    .then((res) => {
                        Item.findAll({
                            where: {
                                listId: req.params.listId
                            },
                            order: [
                                ['id', 'ASC']
                            ]
                        })
                        .then((items) => {
                            callback(null, items);
                        })
                        .catch((err) => {
                            callback(err);
                        })
                    })
                    .catch((err) => {
                        callback(err);
                    })
                })
                .catch((err) => {
                    callback(err);
                });
            }
        })
        .catch((err) => {
            callback(err);
        })
    }
}