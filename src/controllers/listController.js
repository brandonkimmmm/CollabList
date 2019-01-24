const listQueries = require('../db/queries.lists.js');

module.exports = {
    create(req, res, next) {
        let response = {
            'list': undefined
        }
        if(!req.body.userId) {
            response.message = 'Error: must be logged in'
            res.send(response);
        } else {
            let newList = {
                name: req.body.name,
                userId: req.body.userId
            }
            listQueries.createList(newList, (err, list) => {
                if(err) {
                    response.message = 'Error: ' + err.errors[0].message;
                    res.send(response);
                } else {
                    response.list = list;
                    response.message = 'List successfully created';
                    res.send(response);
                }
            });
        }
    },

    show(req, res, next) {
        let response = {
            'list': undefined,
            'members': undefined
        }
        listQueries.show(req.params.listId, (err, list, member) => {
            if(err || !list) {
                response.message = 'Error: List cannot be found';
                res.send(response);
            } else {
                response.list = list;
                response.members = member;
                res.send(response);
            }
        })
    }
}