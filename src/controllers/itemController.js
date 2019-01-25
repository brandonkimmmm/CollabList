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
    },

    update(req, res, next) {
        let response = {
            items: []
        }
        let updatedItem = {
            id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            amount: req.body.amount,
            listId: req.params.listId,
            purchased: req.body.purchased
        }
        itemQueries.updateItem(updatedItem, (err, items) => {
            if(err || !items) {
                response.message = 'Error: ' + err.errors[0].message;
                res.send(response);
            } else {
                response.items = items;
                response.message = 'Item successfully updated';
                res.send(response);
            }
        })
    }
}