var express = require('express');

var path = require('path');

var app = express();

var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

var count = 0;

io.sockets.on('connection', function (socket) {
	var data = {};
	data['number'] = count;
	socket.emit('send_message', data);
	socket.on("button_clicked", function (data) {
		data.number = count++;
		console.log(count);
		io.emit('send_message', data);
	})
	socket.on("count_reset", function (data) {
		count = 0;
		data.number = count;
		io.emit('send_message', data);
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