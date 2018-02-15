var http=require("http");
var url=require("url");
var fs=require("fs");
var qs = require("querystring");
var mysql = require("mysql");

function DatabaseConnection() {
  var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'passengers_details'
    });
    return connection;
}
var connection = DatabaseConnection();
connection.connect();
http.createServer(function(req,res)
{
    var passengersdetails = fs.readFileSync("./Passengers_details_in_multi_reactjs.html").toString();
    var parseurl=url.parse(req.url,true);
    var queries=parseurl.query;
    function getDetails() {
        console.log("Coming");
        connection.query("select * from user", function(error, result, fields) {
        res.write(JSON.stringify(result));
        res.end();
        });
    }
    if (req.method=="POST") {
        let body = "";
        req.on("data", function (chunk){
            body+=chunk;
        });
        req.on("end", function() {
            callFun(body);
        });
    } else{
      let q = url.parse(req.url , true);
      if(q.pathname == "/build/bundle.js" || q.pathname == "/passengers_details.css"){
        res.end(fs.readFileSync("."+q.pathname));
      } else {
        res.write(passengersdetails);
        res.end();
      }
    }

    function callFun(body) {
      let q = qs.parse(body);
        console.log(q);
    if (req.url == "/submit") {
        console.log(q.name)
        let sql = "insert into user(name, age, gender, maritial_status, address , place ,phonenumber , email_id) values('"+q.name +"',"+ q.age  +",'"+ q.gender  +"','"+ q.maritial_status  +"','"+ q.address  +"','"+ q.place  +"','"+ q.phonenumber  +"','"+ q.email_id+"');";
        connection.query(sql, function(error, result, fields) {
            getDetails();
        });
    }else if (req.url == "/getdetails"){
        getDetails();
    }else if (req.url == "/edit"){
        let sql = "update user set name ='"+q.name +"',age = "+q.age+",gender = '"+ q.gender  +"',maritial_status = '"+ q.maritial_status  +"',address = '"+ q.address  +"',place = '"+ q.place  +"',phonenumber = '"+ q.phonenumber  +"',email_id = '"+ q.email_id+"' where id = "+q.id+";"
        connection.query(sql, function(error, result, fields) {
            getDetails();
        });
    } else if (req.url == "/delete"){
        let sql = "delete from user where id = "+ q.id + ";" ;
        connection.query(sql, function(error, result, fields) {
            getDetails();
        });
    } else if (req.url == "/search") {
        let sql = "select * from user where name like '%"+q.searchquery+"%';";
        connection.query(sql, function(error, result, fields) {
             res.write(JSON.stringify(result));
             res.end();
        });
    } else {
        console.log(req.url)
        res.write(passengersdetails);
        res.end();
    }
    }
}).listen(8080);
