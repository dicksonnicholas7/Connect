module.exports = (io) => {

    
const {generateMessage} = require('./utils/message');
const {Users} = require('./utils/users');
var users = new Users();
const Chat = require('../models').Chat;




io.on('connection', function (socket) {

    console.log('New user joined');
  
    let JobId = '';
  
    let chat_messages = [];
  
  
  //create a private room for client and freelancer based on JobID 
    socket.on('join', (param, callback) => {
  
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);

        console.log(socket.client.id)
  
        JobId = param.room;
        
        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        
        socket.emit('newMessage', generateMessage('Connect!', 'Welcome to the discussion platform'));
        socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', `${param.name} has Joined`));
  
  
        callback('');
    });
  
  
  
    
  
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newMessage', generateMessage(message.from, message.text));
  
        chat_messages.push(generateMessage(message.from, message.text));
  
        callback({
          err: 0,
          msg: 'Done'
      });
    });
  
  
  
    socket.on('disconnect', () => {
        

        // setTimeout(() => {

            var user = users.removeUser(socket.id);
        
            if(user){
                console.log(`${user.name} was Disconnected to server in room ${user.room}`);
                io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                io.to(user.room).emit('newMessage', generateMessage('Connect!', `${user.name} has Left`));
                console.log(chat_messages);

                if(chat_messages.length !== 0 ){
                    Chat.create({JobId:JobId, message:JSON.stringify(chat_messages)}).then(res => {
                        console.log(res);
                      });
                }

            }

        // },180000);

        
    });
  
  });
  
  

}


