/* App Configuration */
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: ''
});
connection.connect();

/* Home Route*/
app.get('/', function(req, res){
    res.render('home');
});

/* Login Routes */
app.get('/login', function(req, res){
    res.render('login');
});

/* Error Route*/
app.get('*', function(req, res){
   res.render('error'); 
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})