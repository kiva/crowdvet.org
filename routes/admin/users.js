const passport = require("passport");
const _ = require("lodash");

module.exports = app => {

  const {
    Enterprises,
    Evaluations,
    Votes,
    Questions,
    Answers,
    Sectors,
    Users,
    Images,
    UsersSectors,
    Countries
  } = app.datasource.models.Enterprises.model;

  app.get("/api/admin/users", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { is_admin } = req.query;
      const result = await Users.findAll({where: {admin: is_admin || false}});
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/admin/users/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Users.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/admin/users/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = await Users.update({ name }, { where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  /*
  * Admins
  */
  app.get("/api/admin/admins", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Users.findAll({where: {admin: true}});
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/admin/admins/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Users.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/admin/admins/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { name } = req.body;
      const result = await Users.update({ name }, { where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
