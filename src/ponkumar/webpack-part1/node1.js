var http = require("http");
var mysql = require("mysql");
var url = require("url");
var qs = require('querystring');
var fs = require("fs");
var urlval;
var DBConnection;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webpack_1"
});
con.connect(function(err) {
  if (err) throw err;
  console.log(" DBConnection Connected!");
  DBConnection = con.query.bind(con);
});
http.createServer(urlParser).listen(8080);
function urlParser (req,res) {
    urlval=url.parse(req.url,true);
    if (req.method == 'POST'){
	    var body = "";
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            urlval.query = qs.parse(body);
            server(req,res);
        });
    }else{
	    server(req,res);
    }
}

function server (req,res) {
    // let table_name = "details";
    let table_name = "sample";
    console.log(req.url);
    function writeFile(path) {
        res.end(fs.readFileSync(path).toString());
    }
    if (urlval.pathname == "/getAllDetails"){
        DBConnection("SELECT * FROM "+table_name+" ", function (err, result, fields) {
            if (err) {
                res.end("some error in /getAllDetails");
            } else  {
                 DBConnection("SELECT COUNT(*) as num FROM "+table_name+" ", function (err, obj, fields) {
                    if (err) {
                        res.end("some error in /getAllDetails");
                    } else  {
                        res.end(JSON.stringify({details:result,detailsCount:obj.num}));
                    }
                });
            }
        });
    } else if (urlval.pathname == "/getSomeDetails"){
        // let sql = "SELECT * FROM "+table_name+" where roll_no > "+(urlval.query.currentPage)+" order by roll_no asc limit 10";
        let sql = "SELECT name,age,email,phone FROM "+table_name+"  limit "+(urlval.query.currentPage*10)+" , 10";
        console.log(sql);
        DBConnection(sql, function (err, result, fields) {
            if (err) {
                res.end(err+"some error in /getSomeDetails");
            } else  {
                DBConnection("SELECT COUNT(*) as num FROM "+table_name+" ", function (err, obj, fields) {
                    if (err) {
                        res.end("some error in /getAllDetails");
                    } else  {
                        obj = {details:result,detailsCount:obj[0].num}
                        res.end(JSON.stringify(obj));
                    }
                });
            }
        });
    } else if (urlval.pathname == "/addDetails"){
        // let column = "name,age,gender,email,native,bloodgroup,language,marital,phone";
        let column = "name,age,email,password,phone";
        // create table sample (name text not null,age text not null,email text not null,password text not null,phone text not null);
        // "create table sample (name varchar(255) not null,age varchar(255) not null,email varchar(255) not null,password varchar(255) not null,phone varchar(255) not null)";
        let columnarray = column.split(",");
        let sql = "";
        for (let index in columnarray) {
                sql +=","+  "'"+urlval.query[columnarray[index]]+"'";
        }
        // sql =   "insert into "+table_name+" (name,age,gender,email,native,bloodgroup,language,marital,phone) values ('ponkumar',18,'M','ponkumar@email.com','surandai','B+','tamil','NO',1234567890)";
        // sql = "insert into "+table_name+" (name,age,gender,email,native,bloodgroup,language,marital,phone) values ("+sql.slice(1)+")";
        sql = "insert into "+table_name+" ("+column+") values ("+sql.slice(1)+")";
        DBConnection(sql,function(error,result){
            if (error) {
                res.end(error+"addDetails unsuccess fully");
            } else  {
                res.end("addDetails success fully");
            }
        });
    } else if (req.url.startsWith("/source/")) {
        try {
            writeFile("./build/"+req.url.slice("/source/".length));
        } catch (err) {
            res.end("CANNOT GET "+req.url);
        }
    } else {
        writeFile("index.html");
    }
}
