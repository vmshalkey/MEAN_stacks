var express = require('express');

var path = require('path');

var app = express();

var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	socket.on("form_submitted", function (data) {
		data.lucky_num = Math.floor(Math.random()*1000);
		socket.emit('send_message', data);
	})
})

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
})