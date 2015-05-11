var express = require('express');

var app = express();

app.set('port',process.env.PORT || 3000);

// set up handlebars view engine
var handlebars = require('express3-handlebars')
	.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');

app.get('/',function(req,res){
	res.type('text/plain');
	res.send('Meadowlark Travel');
});
app.get('/about/contact',function(req,res){
	res.type('text/plain');
	res.send('contact');
});
app.get('/about/directions', function(req,res){
	res.type('text/plain');
	res.send('directions');
});
//the order matters, so about* has to be the last one of the abouts
app.get('/about*',function(req,res){
	res.type('text/plain');
	res.send('about whatever');
});
app.get('/about', function(req,res){
	res.type('text/plain');
	res.send('About Meadowlark Travel');
});

//custom 404 page
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function (){
	console.log('Express started');
});