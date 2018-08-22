const passport = require("passport");

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
      console.log(e);
    }
  });

  app.get("/api/admin/recomendations/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Recomendations.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.delete("/api/admin/recomendations/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      await Recomendations.destroy({ where: { id } });
      res.status(200).send({ data: true });
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/admin/recomendations", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Recomendations.create({
        ...req.body
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
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
      console.log(e);
    }
  });
};
