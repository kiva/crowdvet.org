const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
const HttpStatus = require('http-status');
const jwt = require('jwt-simple');

module.exports = app => {
  const config = app.config;
  const { Users } = app.datasource.models;

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/user");
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/auth/signup", (req, res, next) => {
    passport.authenticate("local-signup", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (user) {
        req.login(user, err => {
          return res.status(200).send({ user });
        });
      }
      if (info) {
        return res.status(422).send({ error: info.message });
      }
    })(req, res, next);
  });

  app.post("/auth/login", (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (user) {
        req.login(user, err => {
          return res.status(200).send({ user });
        });
      }
      if (info) {
        return res.status(422).send({ error: info.message });
      }
    })(req, res, next);
  });

//Admin token auth
app.post('/api/token', (req, res) => {
  if(req.body.email && req.body.password) {
    const {email, password} = req.body;

    Users.findOne({where: {email}})
    .then(user => {
      if(Users.isPassword(user.password, password)) {
        const payload = {id: user.id}
        res.json({
        token: jwt.encode(payload, config.jwtSecret)
        })
      } else {
        res.sendStatus(HttpStatus.UNAUTHORIZED)
      }
    })
    .catch(err => {
      res.sendStatus(HttpStatus.UNAUTHORIZED)
    })
  } else {
    res.sendStatus(HttpStatus.UNAUTHORIZED)
  }
})

  //AUTH REQUIRED
  app.get("/api/blogs", requireLogin, async (req, res) => {
    res.send("logueadooo");
  });

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
