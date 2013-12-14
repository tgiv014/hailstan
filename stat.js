var clients = [];
var lookup = [];
var recordClick = function(address){
	id=lookup.indexOf(address);
	if(id>-1){
		user=clients[id];
		user.count++;
		console.log(user.count+' '+user.address);
	}else{
		id=lookup.push(address);
		data = new Object();
		data.address=address;
		data.count=1;
		data.id=id;
		clients.push(data);
		console.log(data.count+' '+data.address);
	}
}

var processHits = function(){
	//clients.sort(function(a,b){
	//	return b.count-a.count;
	//});

	console.log(clients);
	console.log(lookup);
}

module.exports.recordClick = recordClick;
module.exports.processHits = processHits;