
var colorful = require('./lib/colorful.js')
   , prompt = require('./lib/prompt.js')
   , client = require('./lib/client.js')


process.stdin.setEncoding('utf-8')

//use Austin freenode web server as default
client.join('asimov.freenode.net', '#Node.js', 'saamyj_test')
