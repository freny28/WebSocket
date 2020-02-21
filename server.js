//StAuth10065: I Freny Patel, 000744054 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/teacher', function(req, res){  
  res.sendFile(__dirname + '/teacher.html');});
  
app.get('/student', function(req, res){  
  res.sendFile(__dirname + '/student.html');});
 
io.on('connection',function(socket){
	socket.on('question',function(data1){
		var type = data1.type;
		 if(type=="match"){
			 socket.on('matchQuestion',function(data){
				io.emit('questions', {type:type,questions:data.questions,answers:data.answers,score:data.score,timer:data.timer,matchDes:data.matchDes});
			});	
		}else{
			socket.on('mcqQuestion',function(data){
				io.emit('questions',{type:type,question:data.question,answers:data.answers,options:data.options,score:data.score,timer:data.timer});
			});		
		}
		
	});
	socket.on('response',function(data){
		io.emit('studentRes',{score:data.score,name:data.name,rightAns:data.rightAns,cumScore:data.cumScore});
	});

});  
http.listen(3000, function(){ console.log('listening on :3000'); });