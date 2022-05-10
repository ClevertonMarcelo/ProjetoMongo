const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = Schema({
    login: { type: String, required: true },
    senha: { type: String, required: true },
    pergunta_secreta: { type: String, required: true },
    resposta_pergunta: { type: String, required: true }
});

module.exports = mongoose.model("Usuario", Usuario)