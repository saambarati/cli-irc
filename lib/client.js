
var irc = require('../irc/lib/irc.js')
   , client = null 
   , colorful = require('./colorful.js')
   , stdin = process.stdin
   , options

exports.join = function(server, chatroom, username) {
  options = {
              'userName' : username 
              , 'autoRejoin' : true
              //, 'debug' : true
              //, 'showErrors' : true
              , 'channels' : [chatroom]
            }
  client = new irc.Client(server, username, options)
  //client.on('raw', function (message) {console.log(message)})
 
   stdin.resume() 

   client.on('message', function (from, to, message) {
      colorful.writeMany(
         [
            ['yellow', '[' + to + ']']  
            , ['blue', '=>']
            , ['green', from]
            , ['  ' + message + '\n']
         ]
      )
   })

   client.on('connect', function() {
      colorful.write('cyan', 'attempting connection to ' + chatroom + ' on ' + server + '  with username: ' + username + '\n')
   })
   client.once('join', function () {
     colorful.write('green', 'joined => ' + chatroom + '\n')
   })
   

   client.on('netError', function (e) {
      console.log('net error event')
      console.log(e.message + e.stack)
      //throw e
   })

   stdin.on('data', function(data) {
      client.say(chatroom, data) 
   })
}



