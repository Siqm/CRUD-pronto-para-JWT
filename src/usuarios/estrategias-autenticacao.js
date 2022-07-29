const passport = require('passport')
const { InvalidArgumentError } = require('../erros')
const LocalStrategy = require('passport-local').Strategy
const Usuario = require('./usuarios-modelo')
const brcrypt = require('bcrypt')

function verificaUsuario(usuario) {
    if(!usuario) {
        throw new InvalidArgumentError('Não foi possível encontrar um usuário com esse email!');
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await brcrypt.compare(senha, senhaHash)
    if(!senhaValida) {
        throw new InvalidArgumentError('E-mail ou senha inválidos')
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        sessions: false
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.buscaPorEmail(email)
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senhaHash)

            done(null, usuario)
        } catch (erro) {
            done(erro);
        }
    })
)