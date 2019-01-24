const memberQueries = require('../db/queries.members.js');
const Member = require('../db/models').Member;
const User = require('../db/models').User;
const List = require('../db/models').List;


module.exports = {
    new(req, res, next) {
        let response = {
            'member': undefined
        }
        let newMember = {
            username: req.body.username,
            listId: req.params.listId,
        }
        memberQueries.addMember(newMember, (err, member) => {
            if(err || member == null) {
                response.message = 'Error: ' + err.errors[0];
                res.send(response);
            } else {
                response.member = member;
                response.message = 'Member successfully added';
                res.send(response);
            }
        })
    },

    destroy(req, res, next) {
        let response = {
            members: undefined,
            listId: req.params.listId
        }
        if(req.body.userId !== req.body.listUserId) {
            Member.findAll({
                where: {
                    listId: req.params.listId
                },
                include: [
                    User,
                    List
                ]
            })
            .then((members) => {
                response.members = members;
                response.message = 'Error: Must be owner of list to delete';
                res.send(response);
            })
        }
        memberQueries.deleteMember(req, (err, members) => {
            if(err) {
                Member.findAll({
                    where: {
                        listId: req.params.listId
                    },
                    include: [
                        User,
                        List
                    ]
                })
                .then((members) => {
                    response.members = members;
                    response.message = 'Error: Cannot delete member'
                    res.send(response);
                })
            } else {
                response.members = members;
                response.message = 'Member was deleted from list';
                res.send(response);
            }
        })
    }
}