const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
const HttpStatus = require("http-status");
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const {sendEmail} = require('../services/emailer');
const uuid = require("uuid/v4");
const APP_URL_BASE = process.env.APP_URL_BASE || 'http://localhost:3000';

module.exports = app => {
  const { Users } = app.datasource.models.Enterprises.model;

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
  app.post("/api/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;

      Users.findOne({ where: { email } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, keys.jwtSecret)
            });
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          }
        })
        .catch(err => {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        });
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });

  app.put("/api/forgotpass", async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "No Request Body" });
    if (!req.body.email)
      return res.status(400).json({ message: "No Email in Request Body" });

    const token = uuid();
    const emailData = {
      to: req.body.email,
      subject: "Password Reset Instructions",
      text: `Please use the following link for instructions to reset your password: ${APP_URL_BASE}/resetpass/${token}`,
      html: `<p>Please use the link below for instructions to reset your password.</p><p>${APP_URL_BASE}/resetpass/${token}</p>`
    };

    try {
      await Users.update(
        { resetPassLink: token },
        { where: { email: req.body.email } }
      );
      sendEmail(emailData);
      return res
        .status(200)
        .json({ message: `Email has been sent to ${req.body.email}` });
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/resetpass", async (req, res) => {
    const { resetPassLink, newPassword } = req.body;
    try {
      await Users.update(
        { password: Users.hash(newPassword), resetPassLink: null },
        { where: {resetPassLink } }
      );
      return res.status(200);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
