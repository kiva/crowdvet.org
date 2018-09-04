const passport = require("passport");
const HttpStatus = require('http-status');

module.exports = app => {
  const { Enterprises, Evaluations, Sectors } = app.datasource.models.Enterprises.model;

  app.get("/api/admin/sectors", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Sectors.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.get("/api/admin/sectors/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Sectors.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.delete("/api/admin/sectors/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      await Sectors.destroy({ where: { id } });
      res.status(200).send({ data: true });
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.post("/api/admin/sectors", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Sectors.create({
      ...req.body
      });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.put("/api/admin/sectors/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const result = await Sectors.update(
        { name },
        { where: { id } }
      );
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });
};
