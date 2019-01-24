module.exports = {
    init(app) {
        const staticRoutes = require('../routes/static');
        const userRoutes = require('../routes/users');
        const listRoutes = require('../routes/lists');
        const memberRoutes = require('../routes/members');
        const itemRoutes = require('../routes/items');

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(listRoutes);
        app.use(memberRoutes);
        app.use(itemRoutes);
    }
}