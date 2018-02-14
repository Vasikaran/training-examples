var express=require('express');
var app=express();
app.use("/App",express.static(__dirname+"/App"));
app.listen(8443);
