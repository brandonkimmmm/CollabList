const memberQueries = require('../db/queries.members.js');

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
        memberQueries.deleteMember(req, (err, collab) => {
            if(err) {
                res.send('Error: Cannot delete member');
            } else {
                res.send('Member was deleted from list');
            }
        })
    }
}