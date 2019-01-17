const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
    create(req, res, next) {
        if(req.body.password !== req.body.passwordConfirmation) {
            res.send('Error: password confirmation must match password');
        } else {
            let newUser = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }
            userQueries.createUser(newUser, (err, user) => {
                if(err) {
                    console.log(req.isAuthenticated());
                    res.send('Error: ' + err.errors[0].message);
                } else {
                    passport.authenticate('local')(req, res, () => {
                        console.log(req.isAuthenticated());
                        res.send('Account Created!');
                    });
                }
            });
        }
    },

    signin(req, res, next) {
        passport.authenticate('local')(req, res, function() {
            if(!req.user) {
                res.send('Error: wrong credentials');
            } else {
                res.send('Successfully signed in!');
            }
        })
    },

    isAuth(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send(false);
        } else {
            console.log(req.user.email);
            res.send(req.user);
        }
    },

    signout(req, res, next) {
        req.logout();
        res.send('Successfully signed out');
    }
}