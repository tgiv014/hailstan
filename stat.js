var clients = [];
var lookup = [];
var recordClick = function(address){
	id=lookup.indexOf(address);
	if(id>-1){
		user=clients[id];
		user.count++;
		console.log(user.count+' '+user.address);
	}else{
		lookup.push(address);
		data = new Object();
		data.address=address;
		data.count=1;
		clients.push(data);
		console.log(data.count+' '+data.address);
	}
}

var processHits = function(){
	var process = clients;
	process.sort(function(a,b){
		return a.count-b.count;
	});
	console.log(process);
}

module.exports.recordClick = recordClick;
module.exports.processHits = processHits;