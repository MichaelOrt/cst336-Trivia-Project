
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
<<<<<<< HEAD
    host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'mrpqian8llslb2nj',
    password: 'idkc5jph9hcupo2f',
    database: 'am6vqp3388x6bmyi'
=======
    host: 'localhost',
    user: 'carmelo',
    password: 'carmelo',
    database: 'Trivia'
>>>>>>> 5b45d42a39cc7f56caf4ebae73118ca0b976654c
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


/*Dictionary categories*/
var categoriesList = {
    "General Knowledge" : 9,
    "Entertainment: Books" : 10,
    "Entertainment: Film" : 11,
    "Entertainment: Music" : 12,
    "Entertainment: Musicals & Theatres" : 13,
    "Entertainment: Television" : 14,
    "Entertainment: Video Games" : 15,
    "Entertainment: Board Games" : 16,
    "Science & Nature" : 17,
    "Science: Computers" : 18,
    "Science: Mathematics" : 19,
    "Mythology" : 20,
    "Sports" : 21,
    "Geography" : 22,
    "History" : 23,
    "Politics" : 24,
    "Art" : 25,
    "Celebrities" : 26,
    "Animals" : 27,
    "Vehicles" : 28,
    "Entertainment: Comics" : 29,
    "Science: Gadgets" : 30,
    "Entertainment: Japanese Anime & Manga" : 31,
    "Entertainment: Cartoon & Animations" : 32
};

/* Home Route*/
app.get('/', async function(req, res){
        var keys = Object.keys(categoriesList);
   
    res.render('home', {categories : keys});
});

/* Login Routes */
app.get('/login', function(req, res){
    res.render('login');
});

/* Logout Route */
app.get('/logout', function(req, res){
   req.session.destroy();
   res.redirect('/');
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
    let quizInfo;
    var category;
    if(req.query.category === undefined){
        quizInfo  = await retrieveQuestions(numberOfQuestions,'','','');
        category = "Random Trivia"
    }
    else{
        category = req.query.category;
        quizInfo  = await retrieveQuestions(numberOfQuestions,categoriesList[category],'','');
    }
   
    
    
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
    res.render('quiz', {quizValues:questionValues, quizInfo:quizInfo, quizName: category});
});

app.get('/quiz/:category', async function(req, res){
    res.redirect('/quiz?category='+req.params.category);
   
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
    var categoryList = getRandCategory();
    var stmt = `SELECT score FROM users WHERE username = '${req.session.user}'`;
    connection.query(stmt, function(error, result){
           if(error) throw error;
           stmt = `SELECT quiz_name, score, date`+
           ` from Quiz_Taken where username = '${req.session.user}'`;
           connection.query(stmt, function(error, activities){
              
               var string=JSON.stringify(activities);
               var activityList =  JSON.parse(string);
               res.render('welcome', {user: req.session.user,
               categoryList: categoryList, score: result[0].score,
                   activityList: activityList
               }); 
           });
           
    });
    
});

app.get('/categories', isAuthenticated, function(req, res){
   var keys = Object.keys(categoriesList);
   res.render('categories', {user: req.session.user, list: keys});
});
app.get('/friends', isAuthenticated, function(req, res){
    let stmt = `SELECT id FROM users WHERE username= '${req.session.user}'`
    connection.query(stmt, function(error, result){
        var userId;
        if(error) throw error;
        userId = result[0].id;
        
        let stmt2 = `select sender, username, score from pending_request, users where receiver = '${userId}'and id = sender`;
        connection.query(stmt2, function(error, friendRequest){
             if(error) throw error;
             
             var string=JSON.stringify(friendRequest);
             var json =  JSON.parse(string);
             
             res.render('friends', {user: req.session.user, fq: json});
        });
        
    });
     
    //
});
app.post('/addFriend', isAuthenticated, function(req, res){
   
   let stmt =  `SELECT id, Group_CONCAT(username ORDER by id) FROM users WHERE username IN ('${req.body.add}', '${req.session.user}') GROUP By id`;
    connection.query(stmt, function(error, result){
           if(error) throw error;
            var receiver = null;
            var sender = null;
           
           if(result[0].length){
               receiver = result[0].id;
               sender = result[1].id;
               let data =[receiver, sender];
               let stmt2 = 'INSERT INTO pending_request (receiver, sender) VALUES (?, ?)';
               connection.query(stmt2, data, function(error, friendRequest) {
                   if(error) throw error;
                   var string=JSON.stringify(friendRequest);
                   var json =  JSON.parse(string);
                   
               });
           }
        });
   res.redirect('/friends');
});

app.get('/friend/:friendId/delete', function(req, res){
    var stmt = `DELETE FROM pending_request WHERE sender = ${req.params.friendId} and receiver = '3'`;
  
    connection.query(stmt, function(error, result){
        if(error) throw error;
        res.redirect('/friends');
    });
});
app.post('/addscore',function(req, res) {
    var str = req.body.correct;
    var score = parseInt(req.body.userScore, 10);
    var stmt = `UPDATE users SET score = score + '${score}' WHERE ((username = '${req.session.user}'));`;
    connection.query(stmt, function(error, results) {
        if(error) throw error;
        
    });
    stmt = `INSERT INTO Quiz_Taken (username, quiz_name, score, date)`+
    ` VALUES ('${req.session.user}', '${req.body.categoryName}', '${str}', now());`;
    res.redirect('/welcome');
    connection.query(stmt, function(error, results) {
        if(error) throw error;
    });
});

app.post('/anonTrivia', async function(req, res) {
    console.log(req.body.quantity)
    var catergories = categoriesList[req.body.categories];
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
    let quizInfo  = await retrieveQuestions(req.body.quantity, catergories,'','');
    res.render('anonTrivia', {quizValues:questionValues, quizInfo:quizInfo, quizName: req.body.categories} );
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

function getRandCategory(){
    
    var cat = [];
    for(var i = 0; i < 5; i++){
        var keys = Object.keys(categoriesList);
        cat.push(keys[ keys.length * Math.random() << 0]);
    }
    
    return cat;
}
app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})