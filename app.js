//jshint esversion:6

const express = require("express");

const ejs = require("ejs");

app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static("public"));

app.set("view engine", "ejs");

io.on("connection",function(socket){
  console.log("New User Connected");

  socket.username= "Anonymous";


  socket.on("change_username",function(data){
    socket.username = data.username;
  });

  socket.on("new_message",function(data){

    io.sockets.emit("new_message",{message : data.message , username : socket.username});
  });

  socket.on("typing",function(data){
    io.sockets.emit("typing",{username : socket.username});
  });


});


app.get("/",function(req,res){
  res.render("index");
});











server.listen(3000,function(){
  console.log("Server started on port 3000");
});
