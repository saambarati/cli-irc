

var stdin = process.stdin
   , stdout = process.stdout
   , colorful = require('./colorful.js')

stdin.setEncoding('utf-8')


exports.getValuesFor = function(valuesToCollect, callback) {
   var collection = {}
      , i = 0

   var collectVals = function () {
      colorful.write('blue', 'please enter => '  + valuesToCollect[i] + '\n') 
      stdin.resume()
      stdin.once('data', function(chunk) {
         collection[ valuesToCollect[i] ] = chunk.replace(/\s*$/, '')
         i+=1
         if (i < valuesToCollect.length) {
            collectVals()
         } else {
            stdin.pause()
            callback(collection)
         }

      })
   }

   collectVals()
}


