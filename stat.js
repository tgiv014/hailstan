var hits = [];

var recordClick = function(address){
	count=hits[address];
	if(hits[address]>-1){
		hits[address]++;
		console.log(address+' has '+hits[address]+' hits.');
	}else{
		hits[address]=1;
		console.log('began the fun - '+address);
	}
}

var processHits = function(){
	hits.sort(function(a,b){return b-a});
	console.log(hits);
}

module.exports.recordClick = recordClick;
module.exports.processHits = processHits;