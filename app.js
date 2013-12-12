var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

var count = 0;
var users = [];

if(process.argv[2]!="test"){
	server.listen(3001);

	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/index.html');
	});
	app.get('/styles.css', function (req, res) {
		res.sendfile(__dirname + '/styles.css');
	});
	app.get('/stan.jpg', function (req, res) {
		res.sendfile(__dirname + '/stan.jpg');
	});
	app.get('/load.gif', function (req, res) {
		res.sendfile(__dirname + '/ajax-loader.gif');
	});
	io.sockets.on('connection', function (socket) {
		var time=0;
		socket.emit('news2', { num: count , next: time});
		socket.on('clicked', function (data) {
			var address = socket.handshake.address;
			if(users.indexOf(address) > -1){
				console.log('ARRR! SPAMMER AHOY!');
			}else{
				count++;
				time=data.t;
				time+=1000;
				socket.emit('news2', { num: count , next: time});
				socket.broadcast.emit('news', { num: count });
				users.push(address);
				console.log(address);
				setTimeout(function(){
					users.splice(users.indexOf(address),1);
				},900);
			}
		});
	});
}else{
	console.log("I'm not falling for you, test");
}