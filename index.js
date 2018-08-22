const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const datasource = require('./config/datasource');

const app = express();


app.datasource = datasource(app);
require('./services/passport')(app);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);
require('./routes/evaluations')(app);
require('./routes/sectors')(app);
require('./routes/countries')(app);
require('./routes/users')(app);
require('./routes/comments')(app);

require('./routes/admin/countries')(app);
require('./routes/admin/enterprises')(app);
require('./routes/admin/evaluations')(app);
require('./routes/admin/sectors')(app);
require('./routes/admin/users')(app);
require('./routes/admin/recomendations')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
