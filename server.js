var express = require('express');
var app = express();

app.use(express.static('app'));

app.listen(process.env.PORT || 3000, function() {
  console.log('server up on port 3000');
});
