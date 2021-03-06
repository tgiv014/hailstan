var express = require('express');
var stat = require('./stat');
var app = express()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server, { log: false });

if(process.argv[2]!="test"){
	server.listen(3001);
	
	var count = 0;
	var users = [];
	var clients1;
	var total1;
	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/index.html');
	});

	app.get('/stats', function (req, res) {
		res.sendfile(__dirname + '/stats.html');
	});

	app.get('/dev', function (req, res) {
		var address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if(address=="192.168.1.125"){
			res.sendfile(__dirname + '/index2.html');
		}else{
			res.send("You probably shouldn't be here.");
		}
	});

	app.use(express.static('assets'));

	io.sockets.on('connection', function (socket) {
		var time=0;
		socket.emit('news2', { num: count , next: time});
		socket.on('clicked', function (data) {
			var address = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
			if(users.indexOf(address) <= -1){
				count++;
				stat.recordClick(address);
				time=data.t;
				time+=125;
				socket.emit('news2', { num: count , next: time});
				socket.broadcast.emit('news', { num: count });
				users.push(address);
				setTimeout(function(){
					users.splice(users.indexOf(address),1);
				},125);
			}
		});
		socket.on('getdata', function (data) {
			socket.emit('data', stat.buildchart());
		});
	});
	setInterval(function(){
			io.sockets.emit('data', stat.buildchart());
		},20000);
	setInterval(stat.processHits,10000);
}else{
	console.log("I'm not falling for you, test");
}
