var express = require('express');
var mysql = require('./db.js');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({extenden:false}));

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.get('/getdata', function(req, res){
  mysql.query(`select * from mytable`,req, function(data){
    res.status(200);
    res.json(data);
    console.log('--------------获取数据成功------------------');
  });
});

app.use('/setdata', function(req, res){
  var data = req.body;      // 获取数据字符串
  data = querystring.stringify(data).split('&');    // 切成数组

  var arr = [];
  for(var i=0; i<data.length; i++){
    data[i] = decodeURI(data[i]);     // 解码
    var index = data[i].indexOf('=');
    arr.push(data[i].slice(index+1));
  }
  console.log(arr);
  
  mysql.query("INSERT INTO mytable(name,sex) VALUES ?",[arr],function(result){
    res.status(200);
    res.json(result);
    console.log('--------------发送数据成功--------------');
  });
});

app.listen(9090);
console.log('------------------开启------------------');