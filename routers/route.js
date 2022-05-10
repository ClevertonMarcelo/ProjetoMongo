const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerAnimal = require('../controllers/controllerAnimal');
const route = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        req.imageName = req.body.nome + '.jpg'
        cb(null, req.imageName)
    },
})
const upload = multer({ storage });

module.exports = route;

//Home
route.get("/home", function (req, res) {
    res.render('home');
});

//Controller Usuario
//Usuario - Login e Recuperação de Senha
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout);
route.get("/recuperarSenha/:login", controllerUsuario.getRecuperarSenha);
//Usuario - CRUD
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);

//Controller Animal
//Animal-CRUD
route.get("/animalCreate", controllerAnimal.getCreate);
route.post("/animalCreate", upload.single('imagem'), controllerAnimal.postCreate);
route.get("/animalList", controllerAnimal.getList);
route.get("/logout", controllerUsuario.getLogout);
route.get("/animalEdit/:id", controllerAnimal.getEdit);
route.post("/animalEdit", upload.single('imagem'), controllerAnimal.postEdit);
route.get("/animalDelete/:id", controllerAnimal.getDelete);

route.get("/usuarioEdit/:id", controllerUsuario.getEdit);
route.post("/usuarioEdit", controllerUsuario.postEdit);
route.get("/usuarioDelete/:id", controllerUsuario.getDelete);

