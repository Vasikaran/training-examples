const http     = require('http');
const fs       = require('fs');
const url      = require('url');
const qrString = require('querystring');
const path     = require('path');
const redis    = require('redis');
const client   = redis.createClient();

http.createServer(function(req,res){
    res.writeHead(200 , {'content-type':'text/html'});
    var ans  = url.parse(req.url,true);
    var file = fs.readFileSync(path.join(__dirname,'../App/employee.html')).toString();
    var body = "";

    if (req.method == 'POST'){
        req.on('data',function(chunk){
            body += chunk;
        });
        req.on('end',function(){
            progValue(body);
        });
    }
    else if (ans.pathname == "/build/bundle.js"){
        res.write(fs.readFileSync("."+ans.pathname));
        res.end();
    } else {
        res.end(file);
    }

    function progValue(givVal){
        var objct = qrString.parse(givVal);
        if (req.url === "/getEmp"){
            client.hgetall("AllDetails" ,function(err,reply){
            if (reply === null){
                    res.write(JSON.stringify({}));
                    res.end();
                } else {
                    res.write(JSON.stringify(reply));
                    res.end();
                }
            });
        }
        else if (req.url === "/setEmp"){
            let checknew = JSON.parse(objct.Empobj);
            if (checknew.employeeID === ""){
                checkEmpID(objct.Empobj);
            } else {
                client.hset("AllDetails", (checknew.employeeID).toString(), JSON.stringify(checknew));
                sendAllEmps();
            }
        }
        else if (req.url === "/delEmployee"){
            client.hdel("AllDetails", objct.employeeID,function(err,reply){
                sendAllEmps();
            });
        }
        else if (req.url == "/getSearchEmp"){
            client.hgetall("AllDetails",function(err,reply){
                if (reply == null){
                    res.end();
                } else{
                    res.write(JSON.stringify(reply));
                    res.end();
                }
            });
        }

        function sendAllEmps(){
            client.hgetall("AllDetails" ,function(err,reply){
                if (reply == null){
                    res.end(JSON.stringify({}));
                }
                else{
                    res.write(JSON.stringify(reply));
                    res.end();
                }
            });
        }

        function checkEmpID(employee){
            let empId = 0;
            client.hgetall("AllDetails" ,function(err,reply){
                if (reply === null){
                    empId = 1;
                } else{
                    let count = Object.keys(reply);
                    empId = Number(count[count.length-1])+1;
                }
                employee = JSON.parse(employee);
                employee.employeeID = empId;
                client.hset("AllDetails", empId.toString() ,JSON.stringify(employee));
                sendAllEmps();
            });
        }
    }
}).listen(8080);
