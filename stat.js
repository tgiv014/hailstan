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
	
}

module.exports.recordClick = recordClick;
module.exports.processHits = processHits;