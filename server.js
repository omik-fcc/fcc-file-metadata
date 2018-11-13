'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});


var app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req,res, next){
   
  if(!req.file){
    
    res.json({error: 'Oops! Something embarrassing happened!'});
  
  }else if(req.file)  {

    var response = {};
    response.name = req.file.originalname;
    response.type = req.file.mimetype;
    response.size = req.file.size;
    res.json(response);
    console.log(req.file);
  
  }
  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
