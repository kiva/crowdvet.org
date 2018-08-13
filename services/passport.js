const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy, ExtractJwt } = require('passport-jwt');
const localOptions = { usernameField: 'email' };

module.exports = app => {
  const {Users, UsersSectors, Comments} = app.datasource.models.Enterprises.model;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findOne({ where: { id },  attributes:["id", "name", "email", "image", "message"], include:[{model: UsersSectors}, {model:Comments}] }).then(user => {
      done(null, user);
    });
  });

  const opts = {}
  opts.secretOrKey = keys.jwtSecret
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

  const strategy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
      .then(user => {
        if(user) {
          return done(null, {
            id: user.id,
            email: user.email
          })
        }
        return done(null, false)
      })
      .catch(error => done(error, null))
})

  passport.use('jwt', strategy);

  passport.use(
    'local-login',
    new LocalStrategy(localOptions, function(email, password, done) {

      Users.findOne({ where: { email }, include:[{model: UsersSectors}, {model:Comments}] })
        .then(user => {
          if (!user || !user.password) {
            return done(null, false, { message: 'Incorrect username.' });
          }

          if (!Users.isPassword(user.password, password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        })
    })
  );

  const localSignUpOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  };

  passport.use(
    'local-signup',
    new LocalStrategy(localSignUpOptions, function(req, email, password, done) {
      const name = req.body.name;
      if (!email || !password || !name) {
        done(err, false, { message: 'You must provide email and password' });
      }

      // See if a user with the given email exists
      Users.findOne({ where: { email } })
        .then(user => {
          //Already in use
          if (user) {
            done(null, false, { message: 'Email in use.' });
          } else {
            // If a user with email does NOT exist, create and save user record
            const newUser = Users.create({
              email: email,
              password: password,
              name: name
            });

            newUser
              .then(user => {
                // Respond to request indicating the user was created
                done(null, user);
              })
              .catch(err => {
                done(null, false, { message: 'Can not process identity' });
              });
          }
        })
        .catch(err => {
          return done(err);
        });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: '/auth/google/callback',
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {

          const existingUser = await Users.findOne({where:{ googleId: profile.id }});
          if (existingUser) {
            return done(null, existingUser);
          }

          const user = await Users.create({
            email: profile.emails[0].value,
            googleId: profile.id,
            name: profile.displayName,
            image: profile.photos[0].value,
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
};
