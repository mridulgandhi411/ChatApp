var keyCount=1;
$(function(){
  var socket = io.connect("http://localhost:3000");

  var message = $("#message");
  var username = $("#username");
  var send_message= $("#send_message");
  var send_username=$("#send_username");
  var chatroom=$("#chatroom");
  var temp=$("#temp");
  send_username.click(function(){
    socket.emit("change_username",{username : username.val()});
  });

  send_message.click(function(){
    socket.emit("new_message", {message : message.val()});
  });

 socket.on("new_message",function(data){

     chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
 });

  message.on("keypress",function(){
    socket.emit("typing");
  });


  socket.on("typing",function(data){
     if(keyCount === 1) {
       $("<p><i>" + data.username + " is typing..." + "</i></p>").appendTo(chatroom)
       .delay(300).queue(function() { $(this).remove(); });
       keyCount++;
     } else {
       $("<p><i>" + data.username + " is typing..." + "</i></p>").appendTo(chatroom)
       .delay(100).queue(function() { $(this).remove(); });
     }
  });

});
