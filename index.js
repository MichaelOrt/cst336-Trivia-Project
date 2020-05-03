/* App Configuration */
var express = require('express');
var methodOverride = require('method-override');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var session = require('express-session');
var bcrypt = require('bcrypt');
const request = require('request');
var app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.use(session({
    secret: 'some secret',
    resave: true,
    saveUninitialized: true
}));


app.set('view engine', 'ejs');

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'michaelort',
    password: 'michaelort',
    database: 'Trivia'
});
connection.connect();



function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
    
}

function checkUsername(username){
    let stmt = 'SELECT * FROM users WHERE username=?';
    return new Promise(function(resolve, reject){
       connection.query(stmt, [username], function(error, results){
           if(error) throw error;
           resolve(results);
       }); 
    });
}

function checkPassword(password, hash){
    return new Promise(function(resolve, reject){
       bcrypt.compare(password, hash, function(error, result){
          if(error) throw error;
          resolve(result);
       }); 
    });
}

/* Home Route*/
app.get('/', function(req, res){
    
    res.render('home');
});

/* Login Routes */
app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', async function(req, res){
    //let parsedData = await retrieveQuestions('10','10','','');
    let isUserExist   = await checkUsername(req.body.username);
    let hashedPasswd  = isUserExist.length > 0 ? isUserExist[0].password : '';
    let passwordMatch = await checkPassword(req.body.password, hashedPasswd);
    if(passwordMatch){
        req.session.authenticated = true;
        req.session.user = isUserExist[0].username;
        res.redirect('/welcome');
    }
    else{
        res.render('login', {error: true});
    }
});

app.get('/register', function(req, res){
    res.render('register');
});
app.get('/quiz', async function(req, res){
    var numberOfQuestions = Math.floor(Math.random() * 25) + 1; 
    let quizInfo = await retrieveQuestions(numberOfQuestions,'','','');
    //console.log(quizInfo)
    
    var questionValues = {
        'easy':{
            'boolean' : 1,
            'multiple': 2
        },
        'medium':{
            'boolean' : 2,
            'multiple': 3
        },
        'hard':{
            'boolean': 4,
            'multiple':5
        }
    }
    res.render('quiz', {quizValues:questionValues, quizInfo:quizInfo});
});
app.post('/quiz', async function(req, res){
    
    let quizInfo = await retrieveQuestions('5','10','','');
    //console.log(quizInfo)
    
    var questionValues = {
        'easy':{
            'boolean' : 1,
            'multiple': 2
        },
        'medium':{
            'boolean' : 2,
            'multiple': 3
        },
        'hard':{
            'boolean': 4,
            'multiple':5
        }
    }
    res.render('quiz', {quizValues:questionValues, quizInfo:quizInfo});
});

app.post('/register', function(req, res){
    let salt = 10;
    bcrypt.hash(req.body.password, salt, function(error, hash){
        if(error) throw error;
        let stmt = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        let data = [req.body.username, hash, req.body.email];
        connection.query(stmt, data, function(error, result){
           if(error) throw error;
           res.redirect('/login');
        });
    });
});

app.get('/welcome', isAuthenticated, function(req, res){
   res.render('welcome', {user: req.session.user}); 
});

app.get('/categories', isAuthenticated, function(req, res){
   res.render('categories', {user: req.session.user});
});
app.get('/friends', isAuthenticated, function(req, res){
   res.render('friends', {user: req.session.user});
});

/* Error Route*/
app.get('*', function(req, res){
   res.render('error'); 
});


function retrieveQuestions(amount, category, difficulty, type){
    
    var url = `https://opentdb.com/api.php?amount=${amount}`;
    if(category.length){
        url+=`&category=${category}`;
    }
    if(difficulty.length){
        url+=`&difficulty=${difficulty}`;
    }
    if(type.length){
       url+=`&type=${type}`; 
    }
    
    return new Promise( function(resolve, reject){
        request(url,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 resolve(parsedData);
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


function grade(){
    console.log("grade");
}

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})