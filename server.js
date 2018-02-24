var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("."));
app.listen(5000);
console.log('Server is listen on localhost:5000');
