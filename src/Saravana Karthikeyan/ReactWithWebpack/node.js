const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const redis = require('redis');

var client = redis.createClient();

http.createServer(startServer).listen(8080);

client.on('connect', function() {
    console.log("Connected");
});

function startServer(req, res) {
    
    function htmlFile(x) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        let htmlReadFile = fs.readFileSync(x);
        return htmlReadFile;
    }
    if (req.method=="POST") {
        let body = "";
        req.on("data", function (chunk){
            body+=chunk;
        });
        req.on("end", function() {
            callFun(body);
        });
    } else if (req.url=="/") {
        let file = htmlFile("./src/index.html");
        res.end(file);
    } else {
        let file = htmlFile("./src/index.html");
        res.end(file);
    }
    
    function callFun(body) {
        var query = qs.parse(body);
        if (req.url=="/addValue") {
            client.rpush("carDetailList", JSON.stringify(query));
            client.lrange("carDetailList", 0, 4, function(err, reply){
                let arr= [];
                for (let i of reply) {
                    arr.push(JSON.parse(i));
                }
                client.lrange("carDetailList", 0, -1,function(err, arrlen){
                    let val = 0;
                    let lenOfArr = arrlen.length;
                    let noOfPage = lenOfArr/5;
                    let filterPage = Math.floor(noOfPage);
                    if (noOfPage>filterPage) {
                        val = filterPage+1;
                    } else {
                        val = filterPage;
                    }
                    res.end(JSON.stringify({"Array":arr, "Length" : val}));
                });
            });
        } else if (req.url=="/allDetails" || req.url=="/getPage" || req.url=="/getTotalbutton") {
            var num = 0;
            if(query.num>1) {
                num = query.num-1;
            }
            num = (num)*5;
            client.lrange("carDetailList", num, num+4, function(err, reply){
                let arr= [];
                for (let i of reply) {
                    arr.push(JSON.parse(i));
                }
                client.lrange("carDetailList", 0, -1,function(err, arrlen){
                    let val = 0;
                    let lenOfArr = arrlen.length;
                    let noOfPage = lenOfArr/5;
                    let filterPage = Math.floor(noOfPage);
                    if (noOfPage>filterPage) {
                        val = filterPage+1;
                    } else {
                        val = filterPage;
                    }
                    res.end(JSON.stringify({"Array":arr, "Length" : val}));
                });
            });
        } else if (req.url==="/getCarDetails") {
            client.lrange("carDetailList", 0, -1, function (err, array) {
                res.end(array[query.Index]);
            });
        }
    }
}