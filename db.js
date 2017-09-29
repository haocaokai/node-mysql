var mysql = require('mysql');

var db = {};

db.query = function sqlback(sqllan,param,fn){
  var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '307356224',
    database : 'cktest',
    port : '3306'
  });

  connection.connect(function(err){
    if(err){
      console.log(err);
      return;
    }
  });

  if(!sqllan) return;

  // var param = [['步惊云',0]];
 
  connection.query(sqllan, [param],function(err, data, fields){
    if(err){
      console.log(err);
      return;
    }
    fn(data);
  });



  connection.end(function(err){
    if(err){
      return;
    }else{
      console.log('连接关闭');
    }
  });
};

module.exports = db;