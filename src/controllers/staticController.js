module.exports = {
    index(req, res, next) {
        res.send({ response: 'Welcome to Grocery List'}).status(200);
    }
}