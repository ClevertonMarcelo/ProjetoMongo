const db_mongoose = require('./config/db_mongoose');
const routes = require('./routers/route');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const express = require('express');
const unirest = require("unirest");
const middlewares = require('./middlewares/middlewares');

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var cookieParser = require('cookie-parser');
var session = require('express-session');

var animal = unirest.get('http://localhost:8081/animal');
console.log(animal);

var req = unirest.get('http://localhost:8081/api/animal').then((res) => {
    var aux = res.body.data.animal;
    for (var i = 0; i < aux.length; i++)
        console.log(aux[i]._id + ' ' + aux[i].nome)
}
);

//var req = unirest.get('http://localhost:8081/api/animal/627c58390077fe453cbdac5e').then((res) => {
//    console.log(res.body.data)
//});

//var req = unirest.post('http://localhost:8081/api/animal/')
//    .send({ "nome": "Pedro", "nomeDoProprietario": "Carlos", "endereco": "tangamandapio", "tipo": "pintir", "raca": "asasasasas" })
//    .then((res) => {
//        console.log(res.body.data)
//    }
//    );

app.use(cookieParser());
app.use(session({
    secret: 'textosecreto', saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}));

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(middlewares.logRegister, middlewares.sessionControl);
app.use(routes);

mongoose.connect(db_mongoose.connection, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Conectado com o BD');
}).catch(() => {
    console.log('Erro na conexão com o BD');
});

app.use(
    express.urlencoded({
        extended: true
    })
)

app.listen(8081, function () {
    console.log("Servidor no http://localhost:8081")
});

