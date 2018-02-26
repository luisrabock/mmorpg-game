module.exports.cadastro = function(application, req, res){
    res.render('cadastro', { validacao: {}, dadosForm: {} })
}

module.exports.cadastrar = function(application, req, res){

    const dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty()
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
    req.assert('senha', 'Senha não pode ser vazia').notEmpty()
    req.assert('casa', 'Casa não pode ser vazia').notEmpty()

    const erros = req.validationErrors();

    if(erros){
        res.render('cadastro', { validacao: erros, dadosForm: dadosForm })
        return;
    }

    const connection = application.config.dbConnection
    const UsuariosDAO = new application.app.models.UsuariosDAO(connection)
    const JogoDAO = new application.app.models.JogoDAO(connection)

    UsuariosDAO.inserirUsuario(dadosForm)
    JogoDAO.gerarParametros(dadosForm.usuario)

    res.send('podemos cadastrar');

}