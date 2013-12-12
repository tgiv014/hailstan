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
		count++;
		socket.emit('news', { hello: count });
		socket.on('my other event', function (data) {
			console.log(data);
		});
	});
}else{
	console.log("I'm not falling for you, test");
}