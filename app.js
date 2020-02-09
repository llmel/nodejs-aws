const express = require('express');
const app = express();

app.get('/', (req , res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App de exemplo escutando na porta ${port}!`));

app.use(express.static('public'));

// Montagem do módulo roteador no aplicativo principal
var first_route = require('./routes/first_routes');
app.use('/primeiras_rotas', first_route);

// Rota com parâmetros na URI - Desta forma, ele retorna um JSON
app.get('/users/:nome', (req,res) => {
	res.send(req.params);
})

// Usando o argumento next() para controlar a função de callback na manipulação da rota
app.get('/exemplo', function (req, res, next) {
	console.log('A resposta será enviada pela próxima função de callback...');
	next();
}, function (req, res) {
	res.send('Olá, respondido pela função 2 do endpoint');
})

// Usando métodos já escritos como respostas ao endpoint
var callback0 = function (req, res, next) {
	console.log('Callback0');
	next();
}
var callback1 = function (req, res, next) {
	console.log('Callback1');
	next();
}
var callback2 = function (req, res, next) {
	res.send('Olá, respondido da função de callback2');
}
app.get('/exemplo-metodo', [callback0,callback1,callback2]);

// Combinando funções independentes e funções dentro do endpoint
app.get('/exemplo-combinado', [callback0,callback1], function (req, res, next) {
	console.log('A resposta será enviada pela próxima função de callback...');
	next();
}, function (req, res) {
	res.send('Olá, respondido pela função de dentro do endpoint,após duas funções independentes');
})

// Rota padrão, com vários métodos dentro da rota
app.route('/livro')
	.get(function (req, res) {
		res.send('Get um livro aleatório');
	})
	.post(function (req, res) {
		res.send('Add um livro');
	})
	.put(function (req, res) {
		res.send('Update o livro');
	})
	
