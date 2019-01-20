const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const base = 'http://localhost:5000/api/lists/';
const List = require('../../src/db/models').List;
const User = require('../../src/db/models').User;

describe('routes : users', () => {
    beforeEach((done) => {
        this.user;
        sequelize.sync({force: true})
        .then(() => {
            User.create({
                email: 'user@example.com',
                username: 'sampleUser',
                password: 'password'
            })
            .then((user) => {
                this.user = user;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('POST /api/lists/create', () => {
        it('should create a new list with this.user.id as userId', (done) => {
            let options = {
                url: `${base}create`,
                form: {
                    name: 'list',
                    userId: this.user.id
                }
            }

            request.post(options,
                (err, res, body) => {
                    List.findOne({
                        where: {
                            userId: this.user.id
                        }
                    })
                    .then((list) => {
                        expect(list).not.toBeNull();
                        expect(list.id).toBe(1);
                        expect(list.userId).toBe(this.user.id);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not create a new list without userId', (done) => {
            request.post({
                base: `${base}create`,
                form: {
                    name: 'list',
                    userId: undefined
                },
            },
                (err, res, body) => {
                    List.findById(1)
                    .then((list) => {
                        expect(list).toBeNull();
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

    describe('GET /api/lists/:listId', () => {
        beforeEach((done) => {
            this.list;
            List.create({
                name: 'listName',
                userId: this.user.id
            })
            .then((list) => {
                this.list = list;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should return name, createdAt, updatedAt, and eagerload user', (done) => {
            request.get(`${base}${this.list.id}`, (err, res, body) => {
                expect(res.body).toContain('listName');
                expect(res.body).toContain(this.user.username);
                done();
            });
        });
    });
});