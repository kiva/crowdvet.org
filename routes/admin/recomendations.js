const passport = require("passport");
const HttpStatus = require('http-status');

module.exports = app => {
  const { Recomendations } = app.datasource.models.Enterprises.model;

  app.get("/api/admin/recomendations", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Recomendations.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.get("/api/admin/recomendations/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Recomendations.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.delete("/api/admin/recomendations/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      await Recomendations.destroy({ where: { id } });
      res.status(200).send({ data: true });
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.post("/api/admin/recomendations", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Recomendations.create({
        ...req.body
      });

      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.put("/api/admin/recomendations/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Recomendations.update(
        { ...req.body },
        { where: { id } }
      );
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });
};
