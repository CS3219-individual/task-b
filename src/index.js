require('dotenv').config();

// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
const MONGO_URI = 'mongodb://mongo_db/resthub';

mongoose
     .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
     .then(() => {
          console.log('MongoDB Connected')
     })
     .catch(err => console.log(err));


if (process.env.ENVIRONMENT == "DEVELOPMENT") {
     console.log(`This is ${process.env.ENVIRONMENT} Environment, database will be cleared`);
     mongoose.connection.dropDatabase(
          console.log(`Database cleared.`)
     );
}

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
     console.log(`Running RestHub on port ${port}`);
});

module.exports = app 