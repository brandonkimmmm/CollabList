const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const List = require('../../src/db/models').List;
const Member = require('../../src/db/models').Member;
const Item = require('../../src/db/models').Item;

describe('Member model', () => {
    beforeEach((done) => {
        this.user;
        this.list;
        this.member;
        sequelize.sync({force: true})
        .then(() => {
            User.create({
                email: 'user@example.com',
                username: 'newuser',
                password: 'password'
            })
            .then((user) => {
                this.user = user;
                List.create({
                    userId: this.user.id,
                    name: 'new list'
                })
                .then((list) => {
                    this.list = list;
                    Member.create({
                        userId: this.user.id,
                        listId: this.list.id
                    })
                    .then((member) => {
                        this.member = member;
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

    describe('#create()', () => {
        it('should create an item model with name, amount, purchased, listId, userId, memberId', (done) => {
            Item.create({
                name: 'carrot',
                amount: 1,
                listId: this.list.id
            })
            .then((item) => {
                expect(item).not.toBeNull();
                expect(item.listId).toBe(this.list.id);
                expect(item.amount).toBe(1);
                expect(item.purchased).toBe(false);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should not create an item model without a name', (done) => {
            Item.create({
                amount: 1,
                listId: this.list.id,
                userId: this.user.id,
                memberId: this.member.id
            })
            .then((item) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain('Item.name cannot be null');
                done();
            });
        });
    });
});