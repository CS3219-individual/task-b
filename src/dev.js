const app = require('./index.js');

// Setup server port
var port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
     console.log(`Running RestHub on port ${port}`);
});

module.exports = app 