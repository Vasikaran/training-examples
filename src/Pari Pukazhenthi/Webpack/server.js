var http=require("http");
var url=require("url");
var fs=require("fs");
var mysql = require('mysql');
var qs = require('querystring');

var connection = mysql.createConnection({   
	    host     : 'localhost',   
	    user     : 'root',   
	    password : '',   
	    database : 'details' 
	});  
connection.connect(); 
	    
http.createServer(server).listen(8080);
function server(req,res) {
    var rec=url.parse(req.url,true);
	var file=fs.readFileSync("./index.html").toString();
    if (req.url == "/build/bundle.js"){
        res.end(fs.readFileSync("./build/bundle.js").toString());
    }else if(rec.pathname=="/" || rec.pathname=="/home"){
	    res.end(file);
    } else if (req.method=="POST") {
        var body="";
        req.on ('data', function(chunk){
            body+=chunk;
        });
        req.on ('end', function(){
            fun(body);
        });
    } else if(rec.pathname=="/getDetails"){
        connection.query("select * from appdetails;", function (error, results, fields) {  
	    if (error) throw error;
	    res.end((JSON.stringify(results)));
	   	});
	   	
    } else {
        res.end(file);
    }
    function fun(body) {
        var query = qs.parse(body);
        query = JSON.parse(query.obj);
        if(req.url=="/addDetails"){
            var sql = "insert into appdetails (Name,Age,Email,Number,Password) values ('"+query.name.value+"','"+query.age.value+"','"+query.email.value+"','"+query.number.value+"','"+query.password.value+"');";
    	    connection.query(sql, function (error, results, fields) {  
    		    if (error) throw error;
    		    res.end("added successful");
         	});
        }
    }
    
}
