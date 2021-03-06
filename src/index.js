const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const path = require('path');
const session = require('cookie-session');
const app = express();
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middlewares
app.use(morgan('dev'));
app.use(session({
  secret: 'mysecretword',
  signed: true
}));
//routes
app.use(require('./routes/index'));


//static files








app.set('port', 3000);
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});