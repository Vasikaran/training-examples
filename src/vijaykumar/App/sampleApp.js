var http = require('http');
var url = require('url');
var fs = require("fs");
var request = require("request");
var qrString = require('querystring');
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function(){
    console.log('connected');
});
http.createServer(function(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    var query1 = url.parse(req.url, true);
    var body = "";
    if(query1.pathname == "/alldetail"){
        client.lrange("detail",0 , -1,function(err,reply){
            res.end(JSON.stringify(reply));
        });
    }
    else if (req.method == 'POST') {
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
            redis(body);
        });
    }
    else if (query1.pathname == "/build/bundle.js"){
        file = fs.readFileSync('./build/bundle.js').toString();
        res.end(file);
    }
    else{
        file = fs.readFileSync('./main.html').toString();
        res.end(file);
    }
    function redis(returnVal) {
        var query = qrString.parse(returnVal);

        if(req.url == "/details"){
            client.rpush("detail",query.array,function(err, reply){
               res.end(JSON.stringify(reply));
            });
        }

        else if(req.url == "/delete"){
            client.lrem("detail",1,query.delvalue);
            client.lrange("detail", 0, -1,function(err,reply){
                res.end(JSON.stringify(reply));
            });
        }

        else if(req.url == "/edit"){
            client.lset("detail", query.index, query.array);
            client.lrange("detail", 0, -1, function(err,reply){
                res.end(JSON.stringify(reply));
            });
        }
    }
}).listen(8080);
