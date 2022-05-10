const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Animal = Schema({
    nome: { type: String, required: true },
    nomeDoProprietario: { type: String, required: true },
    endereco: { type: String, required: true },
    tipo: { type: String, required: true },
    raca: { type: String, required: true },
    imagem: { type: String, required: false }
});

module.exports = mongoose.model("Animal", Animal)