const db = require('../../database');

module.exports = {
  adiciona: post => {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO posts (
          titulo, 
          conteudo
        ) VALUES (?, ?)
      `,
        [post.titulo, post.conteudo],
        erro => {
          if (erro) {
            return reject('Erro ao adicionar o post!');
          }

          return resolve();
        }
      );
    });
  },

  lista: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM posts`, (erro, resultados) => {
        if (erro) {
          return reject('Erro ao listar os posts!');
        }

        return resolve(resultados);
      });
    });
  },

  buscaPorId: id => {
    return new Promise ((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM posts
          WHERE id = ?
        `,
        [id],
        (erro, post) => {
          if(erro) {
            return reject ('Não foi possível encontrar o post!')
          }

          return resolve(post)
        }
      )
    })
  }
};
