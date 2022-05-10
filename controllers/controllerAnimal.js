const Animal = require('../models/models_nosql/animal');


module.exports = {

    async getCreate(req, res) {
        res.render('animal/animalCreate');
    },
    async postCreate(req, res) {
        const { nome, nomeDoProprietario, endereco, tipo, raca } = req.body;
        const imagem = req.imageName;
        const animal = new Animal({ nome, nomeDoProprietario, endereco, tipo, raca, imagem });
        await animal.save();
        res.redirect('/home');
    },

    async getList(req, res) {
        Animal.find().then((animais) => {
            res.render('animal/animalList', { animais: animais.map(animais => animais.toJSON()) });
        });
    },
    async getEdit(req, res) {
        await Animal.findOne({ _id: req.params.id }).then((animais) => {
            res.render('animal/animalEdit', { animais: animais.toJSON() });
        });
    },
    async postEdit(req, res) {
        const { nome, nomeDoProprietario, endereco, tipo, raca } = req.body;
        const imagem = req.imageName;
        await Animal.findOneAndUpdate({ _id: req.body.id }, { nome, nomeDoProprietario, endereco, tipo, raca, imagem });
        res.redirect('/animalList');
    },
    async getDelete(req, res) {
        await Animal.findOneAndRemove({ _id: req.params.id });
        res.redirect('/animalList');
    }
}



