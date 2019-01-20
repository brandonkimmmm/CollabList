const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const List = require('../../src/db/models').List;

describe('List model', () => {
    beforeEach((done) => {
        this.user;
        sequelize.sync({force: true})
        .then(() => {
            User.create({
                email: 'user@example.com',
                username: 'user',
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
    describe('#create()', () => {
        it('should create a list with an admin.id and itmes', (done) => {
            List.create({
                userId: this.user.id,
                name: 'list'
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
        });

        it('should not create a list without an adminId', (done) => {
            List.create({
                name: 'list'
            })
            .then((list) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain('List.userId cannot be null');
                done();
            });
        });
    });
});