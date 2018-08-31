const passport = require("passport");
const _ = require("lodash");
const HttpStatus = require('http-status');

module.exports = app => {

  const {
    Enterprises,
    Evaluations,
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

  app.delete("/api/admin/users/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      await Users.destroy({ where: { id } });
      res.status(200).send({data: true});
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/admin/users/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Users.findOne({ where: { id } });
      res.status(200).send(result)

    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send({data: e});
    }
  });

  app.put("/api/admin/users/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Users.update({ ...req.body }, { where: { id } });
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
      const { id } = req.params;
      const result = await Users.update({ ...req.body, password: Users.hash(req.body.password) }, { where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/admin/admins", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Users.create({ ...req.body, admin: true });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

    app.delete("/api/admin/admins/:id", passport.authenticate("jwt"), async (req, res) => {
      try {
        const { id } = req.params;
        await Users.destroy({ where: { id, admin: true } });
        res.status(200).send({data: true});
      } catch (e) {
        console.log(e);
      }
    });
};
