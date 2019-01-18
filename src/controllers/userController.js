const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
    create(req, res, next) {
        let response = {
            'user': undefined
        };
        if(req.body.password !== req.body.passwordConfirmation) {
            response.message = 'Error: password confirmation must match password';
            res.send(response);
        } else {
            let newUser = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }
            userQueries.createUser(newUser, (err, user) => {
                if(err) {
                    response.message = 'Error: ' + err.errors[0].message;
                    console.log(err.errors);
                    res.send(response);
                } else {
                    passport.authenticate('local')(req, res, () => {
                        response.message = 'Account Created!';
                        response.user = req.user;
                        res.send(response);
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