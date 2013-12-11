var express = require('express');
var app = express();

if(process.argv[2]!="test"){
app.get('/', function(req, res){
  res.send('All hail Stan!');
});

app.listen(3001);
console.log('Listening on port 3001');
}else{
	console.log("I'm not falling for you, test");
}