var clients = [];
var lookup = [];
var topaddresses = [];
var tophits = [];

var recordClick = function(address){
	id=lookup.indexOf(address);
	if(id>-1){
		user=clients[id];
		user.count++;
		console.log(user.count+' '+user.address);
	}else{
		id=lookup.push(address)-1;
		data = new Object();
		data.address=address;
		data.count=1;
		data.id=id;
		clients.push(data);
		console.log(data.count+' '+data.address);
	}
}

var processHits = function(){
	clients.sort(function(a,b){
		return b.count-a.count;
	});

	var total = 0;

	clients.forEach(function(entry,index){
		lookup[index]=entry.address;
		if(index<=10){
			tophits[index]=entry.count;
			if(index!=10){
				topaddresses[index]=entry.address;
			}else{
				topaddresses[index]='Everyone Else';
			}
		}else{
			tophits[10]+=entry.count;
		}
		total+=entry.count;
	});

	console.log(clients);
	console.log(lookup);
}

var page = function(req, res){
	var content='';
	tophits.forEach(function(entry,index){
		content+='Clicks: '+entry+' User: '+topaddresses[index]+'<br>';
	});
	res.send(content);
}

module.exports.recordClick = recordClick;
module.exports.processHits = processHits;
module.exports.page = page;