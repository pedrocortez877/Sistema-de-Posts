module.exports = (app) => {
    const controller = require('./controller');

    app.post('/usuarios', controller.create);

    app.get('/usuarios', controller.findAll);
}