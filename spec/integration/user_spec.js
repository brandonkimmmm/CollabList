const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:5000/api/users';
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

    describe('POST /users', () => {
        it('should create a new user with valid values', (done) => {
            const options = {
                url: base,
                form: {
                    email: 'user@example.com',
                    username: 'user',
                    password: 'password'
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
                    password: 'password'
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
            });
        });
    });
});