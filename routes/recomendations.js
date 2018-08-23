const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  const { Recomendations } = app.datasource.models.Enterprises.model;

  app.get("/api/recomendations", requireLogin, async (req, res) => {
    try {
      const result = await Recomendations.findAll({
        order: [["order", "ASC"]]
      });
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
