var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

if(process.argv[2]!="test"){
	server.listen(3001);

	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/index.html');
	});

	io.sockets.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(data);
		});
	});
}else{
	console.log("I'm not falling for you, test");
}