const passport = require("passport");
const HttpStatus = require('http-status');

module.exports = app => {
  const { Comments, Users } = app.datasource.models.Enterprises.model;

  app.get(
    "/api/admin/Comments",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { _start, _end } = req.query;
        const result = await Comments.findAndCountAll({
          offset: _start,
          limit: _end
        });
        return res
          .status(200)
          .set("x-Total-Count", result.count)
          .send(result.rows);
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );

  app.get(
    "/api/admin/Comments/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const result = await Comments.findOne({ where: { id } });
        return res.status(200).send(result);
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );

  app.delete(
    "/api/admin/Comments/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        await Comments.destroy({ where: { id } });
        res.status(200).send({ data: true });
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );
};
