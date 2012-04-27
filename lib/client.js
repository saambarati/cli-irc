
var irc = require('../irc/lib/irc.js')
   , client = null 
   , colorful = require('./colorful.js')
   , stdin = process.stdin


exports.join = function(server, chatroom, username) {
   client = new irc.Client(server, username, { 'userName' : username, 'autoRejoin' : true, 'debug' : false })
 
   client.join('#node.js', function () {
      colorful.writeMany(
         [ 
            ['green', 'successfully joined => ']
            , ['yellow', chatroom + '\n']
         ]
      )

      stdin.resume()
   })

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
      colorful.write('cyan', 'attempting connection to ' + chatroom + ' on ' + server + '\n')
   })

   client.on('error', function(err) {
      console.error('error connecting to node.js')
      console.error(err + err.message + err.stack)
   })

   stdin.on('data', function(data) {
      client.say(chatroom, data) 
   })
}



