var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config ={
    user : 'pmahesh9491',
    database : 'pmahesh9491',
    host :'db.imad.hasura-app.io',
    port :'5432',
    password : process.env.DB_PASSWORD
    
}

var app = express();
app.use(morgan('combined'));
var articles = {
    'article-one' : {
        title : 'Article one Mahesh',
        heading : 'article One',
        date : 'aug 3,2017',
        content:  `
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p>
                
                
                
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p>
                
                
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p> `},
    'article-two' : {
        title : 'Article two Mahesh',
        heading : 'article Two',
        date : 'aug 4,2017',
        content:  `
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p>
                
                
                
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p>
                
                
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p> `},
    'article-three' : {
        title : 'Article three Mahesh',
        heading : 'article Three',
        date : 'aug 5,2017',
        content:  `
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p>
                
                
                
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p>
                
                
                <p>
                    This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    This is the content of my first article. This is the content of my first article. This is the content of my first article
                </p> `}
};
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
                        ${date}
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

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select  request
    //return and response with th results
    pool.query('SELECT * FROM test',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
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

app.get('/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articleName] == {} content Object for article one
    var articleName = req.params.articleName; //express library
  res.send(createTemplate(articles[articleName]));
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
