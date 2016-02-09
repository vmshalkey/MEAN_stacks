var express = require("express");

var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());

app.get('/', function(request,response) {
	response.send("<h1>Hello Express</h1>");
	response.render('main', {title:"my Express Project"});
});

app.post('/new_users', function(request,response) {
	console.log("POST DATA \n\n", request.body);
	//add user to db with some code!

	response.redirect('/');

});

app.get("/new_users/:id", function(request,response) {
	console.log("The user id requested is: ", require.params.id);
	response.send("You requested the user with id: " + require.params.id);
});

app.use(express.static(__dirname + "/static"));

app.get("/users", function(request,response) {
	var users_array = [
		{name:"Michael", email:"michael@codingdojo.com"},
		{name:"Jay", email:"jay@codingdojo.com"},
		{name:"Brendan", email:"brendan@codingdojo.com"},
		{name:"Andrew", email:"andrew@codingdojo.com"}
	];
	response.render('users', {users:users_array});
});

app.set('views', __dirname + '/view');

app.set('view engine', 'ejs');

app.listen(8000,function() {
	console.log("listening on port 8000");
})