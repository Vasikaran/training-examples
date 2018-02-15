var http = require('http');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');
var qs = require('querystring');
var path = require('path');
http.createServer(backend).listen(8080);
function ServerForPostMethod (req,res,obj) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q=url.parse(req.url,true);
    var query = [];
    try{
     if (req.url == "/getdetails"){
        query = [];
        query.push('SELECT * FROM StudentDetails;');
        var val = que(query,valueof1);
    }
    else if (q.pathname == "/addDetails" || q.pathname == "/delete" || q.pathname == "/edit"){
         query = [];
        if(q.pathname == "/addDetails" || q.pathname == "/edit"){
        var name = obj.name;
        var age = obj.age;
        var dob = obj.dob;
        var gender = obj.gender;
        var photo = obj.photo;
        var roll = obj.rollno;
        var qualification = obj.standard;
        var bg = obj.bloodgroup;
            if (q.pathname == "/addDetails"){
            query .push('INSERT INTO StudentDetails (name,age,dob,gender,photo,rollno,standard,bloodgroup)VALUES("'+name+'","'+age+'","'+dob+'","'+gender+'","'+photo+'","'+roll+'","'+qualification+'","'+bg+'");');
            } else if (q.pathname == "/edit"){
                var id = obj.ID;
            query .push('UPDATE StudentDetails SET name = "'+name+'", age = "'+age+'", dob = "'+dob+'", gender = "'+gender+'", photo = "'+photo+'", rollno = "'+roll+'", standard = "'+qualification+'", bloodgroup = "'+bg+'" WHERE ID = '+id+';');
            }
        }else if (q.pathname == "/delete"){
            var id = obj.id;
            query .push('DELETE FROM StudentDetails WHERE ID = '+id+';');
        }
        query.push('SELECT * FROM StudentDetails;');
        var val = que(query,valueof1);
    }
    else if (q.pathname == "/search"){
        query = [];
        var search = obj.search;
        query.push("SELECT * FROM StudentDetails WHERE name LIKE '%"+search+"%' ORDER BY name asc;")
        var val = que(query,valueof1);
    }
     else{
         var file = fs.readFileSync("./app/index.html");
         res.end(file);
    }
    } catch(error){
        query = [];
        query.push('SELECT * FROM StudentDetails;');
        var val = que(query,valueof1);
    }
     function valueof1(wer){
            res.end(wer);
    }
}
function backend(req,res)
{
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q=url.parse(req.url,true);
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            ServerForPostMethod(req,res,post);
        });
    }
     else{
        if (q.pathname == "/home" ||q.pathname == "/add" || (/^\/edit\/[0-9]+$/.test(q.pathname))|| (/^\/list\/(|page\/)[0-9]+$/.test(q.pathname))){
        let file = fs.readFileSync("./app/index.html").toString();
        res.end(file);
      } else if (q.pathname == "/src/App.css" || q.pathname == "/build/bundle.js"){
        res.end(fs.readFileSync("."+q.pathname).toString());
      } else{
            res.end("<script>location.href='/home'</script>");
        }
    }
}
function que (q,va)
{
    result = ""
    var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Shahinsha'
    });
    connection.connect();
    var count = 0;
     for (var i=0;i<q.length;i++)
    {
        connection.query(q[i],function (error,results,fields){

            if (error) throw error;
            result = JSON.stringify(results);
            if (result != '')
            {
                count ++;
                if (count == q.length)
                {
                    va(result);
                }

            }

        });
    }

}
