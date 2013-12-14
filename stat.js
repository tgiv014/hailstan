var hits = {};

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

module.exports.recordClick = recordClick;