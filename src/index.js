const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
hbs = exphbs.create({
  defaultLayout: 'main',
  layoutDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Variables Globales
app.use((req, res, next) => {
  next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/movies', require('./routes/movies'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
})
