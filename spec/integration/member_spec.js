const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const base = 'http://localhost:5000/api/lists/';
const List = require('../../src/db/models').List;
const User = require('../../src/db/models').User;
const Member = require('../../src/db/models').Member;

describe('routes : members', () => {
    beforeEach((done) => {
        this.user;
        this.list;
        sequelize.sync({force: true})
        .then(() => {
            User.create({
                email: 'user@example.com',
                username: 'sampleUser',
                password: 'password'
            })
            .then((user) => {
                this.user = user;
                List.create({
                    name: 'newlist',
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
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('POST /api/lists/:listId/members/create', () => {
        beforeEach((done) => {
            this.user;
            this.list;
            sequelize.sync({force: true})
            .then(() => {
                User.create({
                    email: 'user@example.com',
                    username: 'sampleUser',
                    password: 'password'
                })
                .then((user) => {
                    this.user = user;
                    List.create({
                        name: 'newlist',
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
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should create a new member for this.list with userId, listId, and canEdit', (done) => {
            let options = {
                url: `${base}${this.list.id}/members/create`,
                form: {
                    username: this.user.username
                }
            }
            request.post(options,
                (err, res, body) => {
                    Member.findOne({
                        where: {
                            userId: this.user.id,
                            listId: this.list.id
                        }
                    })
                    .then((member) => {
                        expect(member).not.toBeNull();
                        expect(member.userId).toBe(this.user.id);
                        expect(member.listId).toBe(this.list.id);
                        expect(member.canEdit).toBe(true);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not create a new member with an invalid username', (done) => {
            let options = {
                url: `${base}${this.list.id}/members/create`,
                form: {
                    username: 'no user',
                }
            }
            request.post(options,
                (err, res, body) => {
                    Member.findOne({
                        where: {
                            listId: this.list.id,
                        }
                    })
                    .then((member) => {
                        expect(member).toBeNull();
                        expect(body).toContain('Error: Cannot find user with that username');
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not create a new member with invalid listId', (done) => {
            let options = {
                url: `${base}2/members/create`,
                form: {
                    username: this.user.username,
                }
            }
            request.post(options,
                (err, res, body) => {
                    Member.findOne({
                        where: {
                            userId: this.user.id,
                        }
                    })
                    .then((member) => {
                        expect(member).toBeNull();
                        expect(body).toContain('Error: Cannot find list with that listId');
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not create a new member if member already exists', (done) => {
            let options = {
                url: `${base}${this.list.id}/members/create`,
                form: {
                    username: this.user.username,
                }
            }
            Member.create({
                userId: this.user.id,
                listId: this.list.id
            })
            .then((member) => {
                let options = {
                    url: `${base}${this.list.id}/members/create`,
                    form: {
                        username: this.user.username,
                    }
                }
                request.post(options,
                    (err, res, body) => {
                        expect(body).toContain('User is already a member');
                        done();
                    }
                );
            })
        })
    });

    describe('POST /api/lists/:listId/members/:id/destroy', () => {
        it('should delete member where req.params.id = member.id', (done) => {
            Member.create({
                userId: this.user.id,
                listId: this.list.id
            })
            .then((member) => {
                let options = {
                    url: `${base}${this.list.id}/members/${member.id}/destroy`
                }
                request.post(options,
                    (err, res, body) => {
                        Member.findOne({
                            where: {
                                userId: this.user.id,
                            }
                        })
                        .then((member) => {
                            expect(member).toBeNull();
                            expect(body).toContain('Member was deleted from list');
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                    }
                );
            })
        });

        it('should not delte a member where there is no match with member.id', (done) => {
            Member.create({
                userId: this.user.id,
                listId: this.list.id
            })
            .then((member) => {
                let options = {
                    url: `${base}${this.list.id}/members/10/destroy`
                }
                request.post(options,
                    (err, res, body) => {
                        Member.findOne({
                            where: {
                                userId: this.user.id,
                            }
                        })
                        .then((member) => {
                            expect(member).not.toBeNull();
                            expect(member.userId).toBe(this.user.id);
                            expect(member.listId).toBe(this.list.id);
                            expect(body).toContain('Error: Cannot delete member');
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                    }
                );
            })
        })
    });
});