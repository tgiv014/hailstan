var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server, { log: false });

var count = 0;
var users = [];

if(process.argv[2]!="test"){
	server.listen(3001);

	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/assets/index.html');
	});
	app.get('/dev', function (req, res) {
		var address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if(address=="192.168.1.125"){
			res.sendfile(__dirname + '/assets/index2.html');
		}else{
			res.send("You probably shouldn't be here.");
		}
	});
	app.get('/styles.css', function (req, res) {
		res.sendfile(__dirname + '/assets/styles.css');
	});
	app.get('/stan.jpg', function (req, res) {
		res.sendfile(__dirname + '/assets/stan.jpg');
	});
	app.get('/load.gif', function (req, res) {
		res.sendfile(__dirname + '/assets/ajax-loader.gif');
	});
	app.get('/stan.js', function (req, res) {
		res.sendfile(__dirname + '/assets/stan.js');
	});
	io.sockets.on('connection', function (socket) {
		var time=0;
		socket.emit('news2', { num: count , next: time});
		socket.on('clicked', function (data) {
			var address = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
			if(users.indexOf(address) > -1){
				console.log('ARRR! SPAMMER AHOY!');
			}else{
				count++;
				time=data.t;
				time+=500;
				socket.emit('news2', { num: count , next: time});
				socket.broadcast.emit('news', { num: count });
				users.push(address);
				console.log('Legit click from '+address);
				setTimeout(function(){
					users.splice(users.indexOf(address),1);
					console.log('Removed '+address+' from queue');
				},400);
			}
		});
	});
}else{
	console.log("I'm not falling for you, test");
}