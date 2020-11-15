module.exports = (app) => {
    const controller = require('./controller');

    app.post('/post', controller.create);

    app.get('/posts', controller.findAll);

    app.put('/post', controller.update);

    app.delete('/post', controller.remove);

    app.post('/posts/search', controller.search);
}