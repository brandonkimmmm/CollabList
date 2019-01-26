const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const base = 'http://localhost:5000/api/lists/';
const List = require('../../src/db/models').List;
const User = require('../../src/db/models').User;
const Member = require('../../src/db/models').Member;
const Item = require('../../src/db/models').Item;

describe('routes : items', () => {
    beforeEach((done) => {
        this.user;
        this.list;
        this.isMember;
        this.notMember;
        sequelize.sync({force: true})
        .then(() => {
            User.create({
                email: 'user@example.com',
                username: 'sampleUser',
                password: 'password'
            })
            .then((user) => {
                this.user = user;
                User.create({
                    email: 'member@example.com',
                    username: 'member',
                    password: 'password'
                })
                .then((user) => {
                    this.isMember = user;
                    User.create({
                        email: 'non@example.com',
                        username: 'non',
                        password: 'password'
                    })
                    .then((user) => {
                        this.notMember = user;
                        List.create({
                            name: 'newList',
                            userId: this.user.id
                        })
                        .then((list) => {
                            this.list = list;
                            Member.create({
                                userId: this.isMember.id,
                                listId: this.list.id
                            })
                            .then((member) => {
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
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    })
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
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

    describe('POST /api/lists/:listId/item/create', () => {
        it('should create a new list with this.user.id as userId', (done) => {
            let options = {
                url: `${base}${this.list.id}/items/create`,
                form: {
                    userId: this.isMember.id,
                    name: 'carrot',
                    amount: 1,
                    listId: this.list.id
                }
            }

            request.post(options,
                (err, res, body) => {
                    Item.findOne({
                        where: {
                            listId: this.list.id
                        }
                    })
                    .then((item) => {
                        expect(item).not.toBeNull();
                        expect(item.id).toBe(1);
                        expect(item.listId).toBe(this.list.id);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not create a new item if user is not member', (done) => {
            let options = {
                url: `${base}${this.list.id}/items/create`,
                form: {
                    userId: this.notMember.id,
                    name: 'carrot',
                    amount: 1,
                    listId: this.list.id
                }
            }

            request.post(options,
                (err, res, body) => {
                    Item.findOne({
                        where: {
                            listId: this.list.id
                        }
                    })
                    .then((item) => {
                        expect(item).toBeNull();
                        expect(body).toContain('Error: must be a member to create an item')
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

    describe('GET /api/lists/:listId/items', () => {
        it('should return items', (done) => {
            Item.create({
                name: 'carrots',
                amount: 1,
                listId: this.list.id
            })
            .then((item) => {
                request.get(`${base}${this.list.id}/items`, (err, res, body) => {
                    expect(body).toContain(item.name);
                    expect(body).toContain('1');
                    expect(body).toContain(item.listId);
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        });
    });

    describe('POST /api/lists/:listId/item/:id/update', () => {
        beforeEach((done) => {
            this.item;
            Item.create({
                name: 'carrots',
                amount: 1,
                listId: this.list.id
            })
            .then((item) => {
                this.item = item;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })

        it('should update an item with this.params.id with new values', (done) => {
            let options = {
                url: `${base}${this.list.id}/items/${this.item.id}/update`,
                form: {
                    userId: this.isMember.id,
                    name: 'onions',
                    amount: 3,
                    listId: this.list.id,
                    purchased: true
                }
            }

            request.post(options,
                (err, res, body) => {
                    Item.findOne({
                        where: {
                            listId: this.list.id
                        }
                    })
                    .then((item) => {
                        expect(item).not.toBeNull();
                        expect(item.id).toBe(1);
                        expect(item.listId).toBe(this.list.id);
                        expect(item.name).toBe('onions');
                        expect(item.amount).toBe(3);
                        expect(item.purchased).toBe(true);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not update an item if user is not member', (done) => {
            let options = {
                url: `${base}${this.list.id}/items/${this.item.id}/update`,
                form: {
                    userId: this.notMember.id,
                    name: 'onions',
                    amount: 3,
                    listId: this.list.id,
                    purchased: true
                }
            }

            request.post(options,
                (err, res, body) => {
                    Item.findOne({
                        where: {
                            listId: this.list.id
                        }
                    })
                    .then((item) => {
                        expect(item.name).toBe(this.item.name);
                        expect(item.amount).toBe(1);
                        expect(body).toContain('Error: must be a member to update an item')
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

    describe('POST /api/lists/:listId/item/:id/destroy', () => {
        beforeEach((done) => {
            this.item;
            Item.create({
                name: 'carrots',
                amount: 1,
                listId: this.list.id
            })
            .then((item) => {
                this.item = item;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })

        it('should delete an item with this.params.id', (done) => {
            let options = {
                url: `${base}${this.list.id}/items/${this.item.id}/destroy`,
                form: {
                    userId: this.isMember.id
                }
            }

            request.post(options,
                (err, res, body) => {
                    Item.findOne({
                        where: {
                            id: this.item.id
                        }
                    })
                    .then((item) => {
                        expect(item).toBeNull();
                        expect(body).toContain('items')
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it('should not delete an item if user is not member', (done) => {
            let options = {
                url: `${base}${this.list.id}/items/${this.item.id}/destroy`,
                form: {
                    userId: this.notMember.id
                }
            }

            request.post(options,
                (err, res, body) => {
                    Item.findOne({
                        where: {
                            listId: this.list.id
                        }
                    })
                    .then((item) => {
                        expect(item).not.toBeNull();
                        expect(item.name).toBe(this.item.name);
                        expect(item.amount).toBe(1);
                        expect(body).toContain('Error: must be a member to delete an item')
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
});