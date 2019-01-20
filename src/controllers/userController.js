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
        let response = {
            'user': undefined
        }
        // passport.authenticate('local')(req, res, function() {
        //     if(!req.user) {
        //         response.message = 'Error: wrong credentials';
        //         return res.send(response);
        //     } else {
        //         response.message = 'Successfully signed in!';
        //         response.user = req.user;
        //         res.send(response);
        //     }
        // })

        passport.authenticate('local', function(err, user, info) {
            if (err || !user) {
                response.message = 'Error: wrong credentials';
                return res.send(response);
            }
            req.logIn(user, function(err) {
                if (err) {
                    response.message = 'Error: wrong credentials';
                    return res.send(response);
                }
                response.message = 'Successfully signed in!';
                response.user = req.user;
                return res.send(response);
            });
        })(req, res, next);
    },

    isAuth(req, res, next) {
        let response = {
            'user': undefined
        }
        if(!req.isAuthenticated()) {
            res.send(response);
        } else {
            response.user = req.user;
            res.send(response);
        }
    },

    signout(req, res, next) {
        req.logout();
        res.send('Successfully signed out');
    }
}