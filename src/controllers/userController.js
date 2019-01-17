const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
    create(req, res, next) {
        let newUser = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConf
        }

        userQueries.createUser(newUser, (err, user) => {
            if(err) {
                console.log(err);
                res.redirect('/');
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/');
                });
            }
        });
    }
}