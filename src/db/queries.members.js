const User = require('./models').User;
const List = require('./models').List;
const Member = require('./models').Member;

module.exports = {
    addMember(newMember, callback) {
        return User.findOne({
            where: {
                username: newMember.username
            }
        })
        .then((user) => {
            if(!user) {
                let err = {
                    errors: [
                        'Cannot find user with that username'
                    ]
                }
                callback(err);
            } else {
                List.findById(newMember.listId)
                .then((list) => {
                    if(!list) {
                        let err = {
                            errors: [
                                'Cannot find list with that listId'
                            ]
                        }
                        callback(err);
                    } else {
                        Member.findOne({
                            where: {
                                listId: newMember.listId,
                                userId: user.id
                            }
                        })
                        .then((member) => {
                            if(!member) {
                                Member.create({
                                    userId: user.id,
                                    listId: newMember.listId,
                                })
                                .then((member) => {
                                    Member.findOne({
                                        where: {
                                            id: member.id
                                        },
                                        include: [
                                            User,
                                            List
                                        ]
                                    })
                                    .then((foundMember) => {
                                        callback(null, foundMember);
                                    })
                                    .catch((err) => {
                                        callback(err);
                                    })
                                })
                                .catch((err) => {
                                    callback(err);
                                })
                            } else {
                                let err = {
                                    errors: [
                                        'User is already a member'
                                    ]
                                }
                                callback(err);
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
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteMember(req, callback) {
        return Member.findById(req.params.id)
        .then((member) => {
            member.destroy()
            .then((res) => {
                Member.findAll({
                    where: {
                        listId: req.params.listId
                    },
                    include: [User]
                })
                .then((members) => {
                    callback(null, members);
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
}