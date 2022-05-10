const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Receita = Schema({
    nome: { type: String, required: true },
    ingredientes: { type: String, required: true },
    preparo: { type: String, required: true }
});

module.exports = mongoose.model("Receita", Receita)