var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config ={
    user : 'pmahesh9491',
    database : 'pmahesh9491',
    host :'db.imad.hasura-app.io',
    port :'5432',
    password : process.env.DB_PASSWORD
    
}

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret : 'someRandomSecretValue',
    cookie : {maxAge: 1000*60*60*24*30}
}));

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date ;
    var content = data.content ;
    
    var htmlTemplate =`
            <html>
            <head>
                <title>
                    ${title}
                </title>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <br/>
                    <h3>
                       ${heading}
                    </h3>
                    <div>
                        ${date.toDateString()}
                    </div>
                    <div>
                       ${content}
                    </div>
                </div>
            </body>
        </html>
`; 
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //how do we create a hash
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
   var hashedString=hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
});

app.get('/create-user',function(req,res){
    //username,password
    //Json
    var username ="mahesh";
    var password ="password";
    var salt=crypto.randomBytes(128).toString('hex'); 
    var dbString=hash(password,salt) ;
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('user successfully created : '+ username);
        }
    });
    
});

app.post('/login',function(req,res){
    //username,password
    //Json
   /* var username ="mahesh";
    var password = "password";*/
    
    var username =req.body.username;
    var password = req.body.password;
    var salt=crypto.randomBytes(128).toString('hex'); 
    var dbString=hash(password,salt) ;
    pool.query('SELECT * FROM "user" where username = $1',[username],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(403).send('no username/password is invalid');
            }else{
                //match the passwod
                var dbString=result.rows[0].password;
                var salt =dbString.split('$')[2];
                var hashedPassword=hash(password,salt);//creating the hash based on the password submitted and orginal salt
                if(hashedPassword === dbString){
                    
                    //set the session value
                    req.session.auth = {userId: result.rows[0].id};
                    //set cookie with session id
                    //internally, on server side, it maps the sesssion id to an object
                    //{auth: userId}
                    res.send('credentials correct');
                }else{
                    res.status(403).send('username/password is invalid');
                }
                
            }
        }
    });
    
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId) {
       res.send('you are logged in: ' + req.session.auth.userId.toString());
   }else{
       res.send('you are not logged in ');
   }
});
app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('You are logged out');
}
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select  request
    //return and response with th results
    var name1 =2;
    pool.query('SELECT * FROM test ',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

/*hai hellow how are you*/
var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
   res.send(counter.toString()) ;
});


app.get('/comments',function(req,res){
    text="These sre the comments in this page";
    res.send(text);
});

var names =[];
app.get('/submit-name',function(req,res){ //URL =/submit-name?name
   //get the name from request
   var name =req.query.name;
   names.push(name);
   
   //JSON 
   res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articleName] == {} content Object for article one
    /*var articleName = req.params.articleName; //express library*/
   
    pool.query("SELECT * FROM article1 WHERE title = '"+ req.params.articleName+"'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send('article not found')
            }else{
                var articleData  = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
