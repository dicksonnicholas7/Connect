module.exports = (io) => {

const { Op } = require("sequelize");    
const {generateMessage} = require('./utils/message');
const {Users} = require('./utils/users');
var users = new Users();
const Chat = require('../models').Chat;
const moment = require('moment');




io.on('connection', async (socket) => {

   // let t_date = moment().format('YYYY-MM-DD');

    console.log('New user joined');
  
    let JobId = '';

  
  //create a private room for client and freelancer based on JobID 
    socket.on('join', async (param, callback) => {

        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);

        JobId = param.room;
    
        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        
        socket.emit('newMessage', generateMessage('Connect!', 'Welcome to the discussion platform'));
        socket.broadcast.to(param.room).emit('newMessage', generateMessage('Connect!', `${param.name} has Joined the Discussion`));
  
  
        callback('');
    });
  
  
    socket.on('createMessage', (message, callback) => {
       Chat.create({JobId:JobId, message:JSON.stringify(generateMessage(message.from, message.text))}).then(res => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newMessage', generateMessage(message.from, message.text));
        callback({
          err: 0,
          msg: 'Done'
      });
       }).catch(error => {
        console.log(error)
       });
    });
  
  
  
    socket.on('disconnect', async () => {
        // setTimeout(() => {

            var user = users.removeUser(socket.id);
        
            if(user){
                console.log(`${user.name} was Disconnected to server in discussion platform ${user.room}`);
                io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                io.to(user.room).emit('newMessage', generateMessage('Connect!', `${user.name} has Left`));
            }
        // },180000);   
    });
  
  });
  
  

}


