const itemQueries = require('../db/queries.items.js');

module.exports = {
    create(req, res, next) {
        let response = {
            'item': undefined
        }
        let newItem = {
            userId: req.body.userId,
            name: req.body.name,
            amount: req.body.amount,
            listId: req.params.listId
        }
        itemQueries.createItem(newItem, (err, item) => {
            if(err || !item) {
                response.message = 'Error: ' + err.errors[0].message;
                res.send(response);
            } else {
                response.item = item;
                response.message = 'Item successfully created'
                res.send(response);
            }
        })
    },

    showItems(req, res, next) {
        let response = {
            items: []
        }
        itemQueries.showItems(req.params.listId, (err, items) => {
            if(err) {
                res.send(response);
            } else {
                response.items = items;
                res.send(response);
            }
        })
    }
}