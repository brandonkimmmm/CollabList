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
        return List.findOne({
            where: {
                id: listId
            },
            include: [User]
        })
        .then((list) => {
            Member.findAll({
                where: {
                    listId: listId
                },
                include: [User]
            })
            .then((members) => {
                callback(null, list, members);
            })
            .catch((err) => {
                callback(err);
            })
        })
        .catch((err) => {
            callback(err);
        });
    },

    updateList(updatedList, callback) {
        return List.findById(updatedList.id)
        .then((list) => {
            if(!list) {
                let err = {
                    errors: [
                        {
                            'message': 'cannot find list with that id'
                        }
                    ]
                }
                callback(err);
            } else {
                if(list.userId != updatedList.userId) {
                    let err = {
                        errors: [
                            {
                                'message': 'must be owner of list to update'
                            }
                        ]
                    }
                    callback(err);
                } else {
                    let updateList = {
                        name: updatedList.name,
                    }
                    list.update(updateList, {
                        fileds: Object.keys(updateList)
                    })
                    .then(() => {
                        List.findOne({
                            where: {
                                id: list.id
                            },
                            include: [User]
                        })
                        .then((list) => {
                            Member.findAll({
                                where: {
                                    listId: list.id
                                },
                                include: [User]
                            })
                            .then((members) => {
                                callback(null, list, members);
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
                    })
                }
            }
        })
        .catch((err) => {
            callback(err);
        })
    }
}