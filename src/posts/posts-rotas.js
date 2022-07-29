const postsControlador = require('./posts-controlador');

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(postsControlador.adiciona);

  app.route('/post/:id').delete(postsControlador.deleta)
};
