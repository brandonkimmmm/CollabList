const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const List = require('../../src/db/models').List;
const Member = require('../../src/db/models').Member;

describe('Member model', () => {
    beforeEach((done) => {
        this.user;
        this.list;
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
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('#create()', () => {
        it('should create a member model with a listId, userId, and canEdit', (done) => {
            User.create({
                email: 'member@example.com',
                username: 'new member',
                password: 'password'
            })
            .then((user) => {
                Member.create({
                    userId: user.id,
                    listId: this.list.id
                })
                .then((member) => {
                    expect(member).not.toBeNull();
                    expect(member.userId).toBe(user.id);
                    expect(member.listId).toBe(this.list.id);
                    expect(member.canEdit).toBe(true);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

        it('should not create a member model without a listId', (done) => {
            Member.create({
                userId: this.user.id,
                listId: this.list.id,
                canEdit: false
            })
            .then((member) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain('Error');
                done();
            });
        });
    });
});