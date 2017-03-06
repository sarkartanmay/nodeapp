var express = require('express');
var parser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
app.set('port',(process.env.PORT || 5000));
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(function(req,res,next){
	res.locals.userValue = null;
	res.locals.errors = null;
	next();
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'app_views'))

// From - https://github.com/ctavan/express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// End of express-validator

app.get('/',function(req,res){
	res.render('home',{
		topicHead : 'Student Form'
	});
	console.log('user accessing Home page');
});
app.post('/student/add',function(req,res){
	
	// Check Input Field
	req.check('fname', 'First Name is required').notEmpty();
	req.check('lname', 'Last Name is required').notEmpty();
	
	var errors = req.validationErrors();
	if(errors){
		res.render('home',{
			topicHead : 'Student Form',
			errors : errors
		});
		console.log('Error');
	}else{
		var student = {
			first : req.body.fname,
			last : req.body.lname
		}
		console.log(student);
		res.render('home',{
			userValue : student,
			topicHead : 'Student Form'
		});
		console.log('OK');
	}	
});
app.listen(app.get('port'),function(){
	console.log('server running on port '+app.get('port'));
})
