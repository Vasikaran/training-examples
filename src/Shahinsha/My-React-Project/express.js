var http=require('http');
var express=require('express');
var app=express();
console.log("directoryName",__dirname);
app.use("./",express.static(__dirname));
app.listen(8443);
