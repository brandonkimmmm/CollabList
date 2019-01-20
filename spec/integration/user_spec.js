const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:5000/api/users/';
const User = require('../../src/db/models').User;
const sequelize = require('../../src/db/models/index').sequelize;

describe('routes : users', () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user with valid values', (done) => {
            const options = {
                url: base,
                form: {
                    email: 'user@example.com',
                    username: 'user',
                    password: 'password',
                    passwordConfirmation: 'password'
                }
            }

            request.post(options,
                (err, res, body) => {
                    User.findOne({where: {email: 'user@example.com'}})
                    .then((user) => {
                        expect(user).not.toBeNull();
                        expect(user.email).toBe('user@example.com');
                        expect(user.username).toBe('user');
                        expect(user.id).toBe(1);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not create a new user with invalid attributes', (done) => {
            request.post(
                {
                    url: base,
                    form: {
                        email: 'no',
                        username: 'user',
                        password: 'password',
                        passwordConfirmation: 'password'
                    }
                },
                (err, res, body) => {
                    User.findOne({where: {email: 'no'}})
                    .then((user) => {
                        expect(user).toBeNull();
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });

    describe('POST /api/users/signin', () => {
        beforeEach((done) => {
            this.user;
            sequelize.sync({force: true})
            .then(() => {
                request.post(
                    {
                        url: base,
                        form: {
                            email: 'user@example.com',
                            username: 'user',
                            password: 'password',
                            passwordConfirmation: 'password'
                        }
                    },
                    (err, res, body) => {
                        User.findOne({where: {email: 'user@example.com'}})
                        .then((user) => {
                            this.user = user;
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                    }
                );
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should sign in user when correct credentials are entered', (done) => {
            request.post(
                {
                    url: `${base}signin`,
                    form: {
                        email: 'user@example.com',
                        password: 'password'
                    }
                },
                (err, res, body) => {
                    expect(res.body).toContain('Successfully signed in!');
                    done();
                }
            );
        });

        it('should not sign in user when incorrect credentials are entered', (done) => {
            request.post(
                {
                    url: `${base}signin`,
                    form: {
                        email: 'user@example.com',
                        password: 'no'
                    }
                },
                (err, res, body) => {
                    expect(res.body).toContain('Error: wrong credentials');
                    done();
                }
            );
        });
    })

    // describe('GET /api/users/isAuth', () => {
    //     beforeEach((done) => {
    //         this.user;
    //         sequelize.sync({force: true})
    //         .then(() => {
    //             request.post(
    //                 {
    //                     url: base,
    //                     form: {
    //                         email: 'user@example.com',
    //                         username: 'user',
    //                         password: 'password',
    //                         passwordConfirmation: 'password'
    //                     }
    //                 },
    //                 (err, res, body) => {
    //                     User.findOne({where: {email: 'user@example.com'}})
    //                     .then((user) => {
    //                         this.user = user;
    //                         done();
    //                     })
    //                     .catch((err) => {
    //                         console.log(err);
    //                         done();
    //                     });
    //                 }
    //             );
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             done();
    //         });
    //     });

    //     it('should return true when a user is signed in', (done) => {
    //         request.post(
    //             {
    //                 url: `${base}signin`,
    //                 form: {
    //                     email: 'user@example.com',
    //                     password: 'password'
    //                 }
    //             },
    //             (err, res, body) => {
    //                 request.get(`${base}isAuthenticated`, (err, res, body) => {
    //                     expect(res.body).toBe(this.user);
    //                     done();
    //                 });
    //             }
    //         );
    //     });
    // });

    describe('POST /api/users/signout', () => {
        it('should sign out of the accout', (done) => {
            request.post(
                {
                    url: base,
                    form: {
                        email: 'user@example.com',
                        username: 'user',
                        password: 'password',
                        passwordConfirmation: 'password'
                    }
                },
                (err, res, body) => {
                    request.get(`${base}signout`, (err, res, body) => {
                        expect(res.body).toBe('Successfully signed out');
                        done();
                    });
                }
            );
        })
    })
});