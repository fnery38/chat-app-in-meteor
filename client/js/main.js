import { Template } from 'meteor/templating';

Template.main.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Meteor.users');
    self.subscribe('connections');
    Meteor.subscribe('userConnections', true);
  });
});

Template.main.helpers({
  haveUsers(name) {
    if (!name) {
      return false;
    } else {
      return true;
    }
  },

  fetchConnection() {
    const connections = [],
      connectionArr = userConnections.find({}).fetch();
    connectionArr[0].Connections.forEach(e => {
      let connectedUser = Meteor.users
        .find({ user_id: e.connected_to })
        .fetch();
      connections.push(connectedUser[0]);
    });

    return connections;
  }
});

// // Connection
// Meteor.startup(() => {
//   // const PORT = window.socketPort || 3003;
//   let socket = require('socket.io-client')(`https://chatmeteor.herokuapp.com/`);

//   socket.on('connect', function() {
//     console.log('Client connected');
//     let $messageForm = $('#messageForm');
//     let $message = $('#message');
//     let $chat = $('#chat');
//     let $userForm = $('#userForm');
//     let $userFormArea = $('#userFormArea');
//     let $messageArea = $('#messageArea');
//     let $users = $('#users');
//     let $username = $('#username');

//     $messageForm.submit(function(e) {
//       e.preventDefault();
//       socket.emit('send message', $message.val());
//       $message.val('');
//     });

//     socket.on('new message', function(data) {
//       $chat.append(
//         ' <div class="well"><strong>' + data.user + ': ' + data.msg + '</div>'
//       );
//     });

//     $userForm.submit(function(e) {
//       e.preventDefault();
//       socket.emit('new user', $username.val(), function(data) {
//         $userFormArea.hide();
//         $messageArea.show();
//       });
//       $username.val('');
//     });

//     socket.on('get users', function(data) {
//       let html = '';
//       for (let i = 0; i < data.length; i++) {
//         html += '<li class="list-group-item">' + data[i] + '</li>';
//       }
//       $users.html(html);
//     });
//   });
//   socket.on('disconnect', function() {
//     console.log('Client disconnected');
//   });
// });