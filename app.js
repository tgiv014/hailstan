var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);
var count = 0;

if(process.argv[2]!="test"){
	server.listen(3001);

	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/index.html');
	});

	io.sockets.on('connection', function (socket) {
		socket.emit('news', { num: count });
		socket.on('clicked', function (data) {
			console.log(data);
			console.log(data.my);
			count++;
			socket.emit('news', { num: count });
		});
	});
}else{
	console.log("I'm not falling for you, test");
}