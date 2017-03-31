//this module will accept a file along with strings to be searched from frontend
//if string is found, the line will be sent back to frontend

const express = require('express')
const multer = require('multer')
const procstr = require('./findstr');
const path = require('path');
let fpath = '';
var app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// this is used to set the path and filename
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

app.get('/',(req, res)=>{
    res.end("hello world");
});


app.post('/upload', upload.single('file'), function(req, res) {
    res.end(' upload successful' + fpath);
});

app.get('/process', function(req, res) {
    let search = req.query.var1.split(",");
    let filename = req.query.fname;
    console.log('starting to process...')
    fpath = path.join(__dirname, filename);
    console.log(fpath);
    console.log('starting');
    procstr(search, fpath, function(found) {
        res.send(found);
        console.log('finished');
    });
});

app.listen(3000, function() {
    console.log("the server is up on 3000");
});
