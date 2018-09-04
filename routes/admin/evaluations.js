const passport = require("passport");
const _ = require("lodash");
const HttpStatus = require('http-status');

module.exports = app => {
  const { Evaluations } = app.datasource.models.Enterprises.model;

  app.get("/api/admin/evaluations", passport.authenticate("jwt"),  async (req, res) => {
    try {
      const result = await Evaluations.findAll({
        where: { OficialVote: false}
      });
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.post("/api/admin/evaluations", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { enterprise_id, impact, model, prioritization, user_id } = req.body;

      Evaluations.destroy({
        where: { user_id, enterprise_id, OficialVote: false }
      });
      const evaluation = await Evaluations.create({
        user_id,
        enterprise_id,
        impact,
        model,
        prioritization,
        OficialVote: false,
      });

      const result = await Evaluations.findOne({
        where: { id: evaluation.id }
      });

      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.delete(
    "/api/admin/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        await Evaluations.destroy({ where: { id } });
        res.status(200).send({ data: true });
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );


  app.get("/api/admin/evaluations/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Evaluations.findOne({
        where: { id }
      });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.get("/api/admin/kiva/evaluations/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Evaluations.findOne({
        where: { id }
      });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.get("/api/admin/kiva/evaluations", passport.authenticate("jwt"),  async (req, res) => {
    try {
      const result = await Evaluations.findAll({
        where: { OficialVote: true}
      });
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });
  app.post(
    "/api/admin/kiva/evaluations",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const {
          enterprise_id,
          status,
          model,
          impact,
          prioritization,
          body
        } = req.body;
        const user_id = req.user.id;

        Evaluations.destroy({
          where: { user_id, enterprise_id, OficialVote: true }
        });
        const evaluation = await Evaluations.create({
          user_id,
          enterprise_id,
          OficialVote: true,
          status,
          impact,
          model,
          body,
          prioritization
        });
        return res.status(200).send(evaluation);
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );

  app.put(
    "/api/admin/kiva/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const {
          enterprise_id,
          status,
          model,
          impact,
          prioritization,
          body
        } = req.body;
        const { id } = req.params;
        const user_id = req.user.id;

        const result = await Evaluations.update(
          {
            enterprise_id,
            status,
            model,
            impact,
            prioritization,
            body
          },
          { where: { id } }
        );

        return res.status(200).send(result);
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );

  app.put(
    "/api/admin/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const result = await Evaluations.update(
          {
            ...req.body
          },
          { where: { id } }
        );

        return res.status(200).send(result);
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );

  app.delete(
    "/api/admin/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        await Evaluations.destroy({ where: { id } });
        res.status(200).send({ data: true });
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );

  app.delete(
    "/api/admin/kiva/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        await Evaluations.destroy({ where: { id } });
        res.status(200).send({ data: true });
      } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  );
};
