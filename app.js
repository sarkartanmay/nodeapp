var express = require('express');
var parser = require('body-parser');
var path = require('path');
var app = express();
app.set('port',(process.env.PORT || 5000));
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(function(req,res,next){
	res.locals.userValue = null;
	next();
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'app_views'))

app.get('/',function(req,res){
	res.render('home',{
		topicHead : 'Student Form',
	});
	console.log('user accessing Home page');
});
app.post('/student/add',function(req,res){
	var student = {
		first : req.body.fname,
		last : req.body.lname
	}
	console.log(student);
	res.render('home',{
		userValue : student,
		topicHead : 'Student Form'
	});
	//res.json(student);
	
});
app.listen(app.get('port'),function(){
	console.log('server running on port '+app.get('port'));
})
