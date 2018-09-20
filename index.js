// 3rd-party packages
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
// form parser
const bodyParser = require('body-parser');
//IMpoRTanT
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const routes = require('./config/routes');
const session = require('express-session');
// create the app
const app = express();
const { dbURI, port } = require('./config/environment');
// checks if user is logged in
const auth = require('./lib/auth');
const flash = require('express-flash');
// connect to the database
mongoose.connect(dbURI);

// app settings -- app.set()
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(ejsLayouts);
app.use(express.static(`${__dirname}/public`));
// add bodyparser BEFORE the routes
app.use(bodyParser.urlencoded({ extended: true }));
// add method override before routes
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: 'shhh',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
// use the auth to check if is logged in
app.use(auth);
// routes
app.use(routes);

// listen for incoming traffic -- app.listen()
app.listen(port, () => console.log(`Serving fine photos on ${port}`));
