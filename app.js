
var colorful = require('./lib/colorful.js')
   , prompt = require('./lib/prompt.js')
   , client = require('./lib/client.js')


process.stdin.setEncoding('utf-8')

prompt.getValuesFor(['server', 'username', 'chatroom'], function(info) {
   //use Austin freenode web server as default
   client.join(info.server || 'asimov.freenode.net', info.chatroom, info.username)
})


