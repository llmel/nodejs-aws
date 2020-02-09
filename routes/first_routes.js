var express = require('express');
var router = express.Router();

// Função de Middleware - Manipulação de objetos de resposta HTTP.
router.use(function timeLog (req, res, next) {
	console.log('Hora: ', Date.now());
	next();
})

// Rota de Home Page
router.get('/', function (req, res) {
	res.send('Página Inicial da minha primeira rota');
})

// Define este roteador como módulo
module.exports = router;