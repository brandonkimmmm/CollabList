const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;

describe('User model', () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            done();
        });
    });

    describe('create()', () => {
        it('should create a User with a valid email, username, and password', (done) => {
            User.create({
                email: 'user@example.com',
                username: 'user',
                password: 'password'
            })
            .then((user) => {
                expect(user).not.toBeNull();
                expect(user.email).toBe('user@example.com');
                expect(user.username).toBe('user');
                expect(user.password).toBe('password');
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should not create a User with an invalid email', (done) => {
            User.create({
                email: 'no',
                username: 'user',
                password: 'password'
            })
            .then((user) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain('Validation error: must be a valid email');
                done();
            });
        });

        it('should not create a User with an email that is not unique', (done) => {
            User.create({
                email: 'user@example.com',
                username: 'user',
                password: 'password'
            })
            .then((user) => {
                User.create({
                    email: user.email,
                    username: 'username',
                    password: 'password'
                })
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain('Validation error');
                    done();
                });
            });
        });

        it('should not create a User with a username that is not unique', (done) => {
            User.create({
                email: 'user@example.com',
                username: 'user',
                password: 'password'
            })
            .then((user) => {
                User.create({
                    email: 'unique@email.com',
                    username: user.username,
                    password: 'password'
                })
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain('Validation error');
                    done();
                });
            });
        });
    });
});