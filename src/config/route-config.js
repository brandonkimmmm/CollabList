module.exports = {
    init(app) {
        const staticRoutes = require('../routes/static');
        const userRoutes = require('../routes/users');
        const listRoutes = require('../routes/lists');
        const memberRoutes = require('../routes/members');

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(listRoutes);
        app.use(memberRoutes);
    }
}