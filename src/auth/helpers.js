const bcrypt = require('bcryptjs');

module.exports = {
    ensureAuthenticated(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send('Error: must be logged in');
        } else {
            return next();
        }
    },

    comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    }
}