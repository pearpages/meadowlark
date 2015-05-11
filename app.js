var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

app.set('port',process.env.PORT || 3000);

// set up handlebars view engine
var handlebars = require('express3-handlebars')
	.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	//res.type('text/plain');
	//res.send('Meadowlark Travel');
	res.render('home');
});
app.get('/about/contact',function(req,res){
	res.type('text/plain');
	res.send('contact');
});
app.get('/about/directions', function(req,res){
	res.type('text/plain');
	res.send('directions');
});
app.get('/about', function(req,res){
	//res.type('text/plain');
	//res.send('About Meadowlark Travel');
	res.render('about',{fortune: fortune.getFortune()});
});
//the order matters, so about* has to be the last one of the abouts
app.get('/about*',function(req,res){
	res.type('text/plain');
	res.send('about whatever');
});

//custom 404 page
app.use(function(req,res){
	res.status(404);
	//res.type('text/plain');
	//res.send('404 - Not Found');
	res.render('404');
});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	//res.type('text/plain');
	//res.send('500 - Server Error');
	res.render('500');
});

app.listen(app.get('port'), function (){
	console.log('Express started');
});