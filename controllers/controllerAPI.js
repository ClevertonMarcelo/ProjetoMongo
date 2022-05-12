const Animal = require('../models/models_nosql/animal');

module.exports = {
    async getAnimal(req, res) {
        const animal = await Animal.find();
        return res.json({ "data": { "status": "success", animal } });
    },
    async getAnimalById(req, res) {
        const { id } = req.params;
        animal = await Animal.findById(id, (err, animal) => {
            if (err) {
                return res.status(204).json();
            }
        });
        return res.json({ "data": { "status": "success", animal } });
    },
    async postAnimal(req, res) {
        const { nome, nomeDoProprietario, endereco, tipo, raca } = req.body;
        const animal = new Animal({ nome, nomeDoProprietario, endereco, tipo, raca })
        await animal.save().then((animal) => {
            return res.json({ "data": { "status": "success", animal } });
        });
    },
    async putAnimal(req, res) {
        await Animal.findOneAndUpdate({ _id: { $in: req.params.id } }
            , req.body).
            then((animal) => {
                return res.json({ "data": { "status": "success", animal } });
            });
    },
    async deleteAnimal(req, res) {
        await Animal.findOneAndRemove({ _id: { $in: req.params.id } }).then((animal) => {
            return res.json({ "data": { "status": "success", animal } });
        });
    }
}