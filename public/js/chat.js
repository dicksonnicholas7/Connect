
var socket = io('http://192.168.2.85:3000');

function scrollToBottom() {
  var messages = $('#messages');
  
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');

  var newMessage = messages.children('li:last-child');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {

  var room = $('#room').val();
  var name = $('#name').val();

  var param =  {
    room:room,
    name:name
  }

  socket.emit('join', param, function(err) {
    if (err){
      alert(err);
    }else{
      $('#username').val(param.name);
    }
  });

});




socket.on('disconnect', function() {
  console.log('User Disconnected to server');
});




socket.on('newMessage', function(message) {
  var template = $('#message-temp').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: message.createdAt
  });
  $('#messages').append(html);
  scrollToBottom();
});




$('#message-form').on('submit', function (e){
  e.preventDefault();
  sendMessage($('#username').val(), $('#message').val());
});

function sendMessage(from, text){
  socket.emit('createMessage', {
    from,
    text,
    createdAt: moment().valueOf()
  }, function (data) {;
    $('#message').val('');
  });
}



