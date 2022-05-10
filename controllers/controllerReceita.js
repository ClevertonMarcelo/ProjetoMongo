const Receita = require('../models/models_nosql/receita');


module.exports = {

    async getCreate(req, res) {
        res.render('receitan');
    },
    async postCreate(req, res) {
        const { nome, ingredientes, preparo } = req.body;
        const receita = new Receita({ nome, ingredientes, preparo });
        await receita.save();
        res.redirect('/home');
    },
    async getList(req, res) {
        Receita.find().then((receitas) => {
            res.render('receita/receitaList', { receitas: receitas.map(receitas => receitas.toJSON()) });
        });
    }
}