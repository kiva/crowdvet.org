const passport = require("passport");
const _ = require("lodash");

module.exports = app => {
  const {
    Evaluations,
    Votes,
    Answers,
    Questions
  } = app.datasource.models.Enterprises.model;

  app.get("/api/votes", async (req, res) => {
    try {
      const { evaluation_id } = req.query;
      const result = await Votes.findAll({
        where: { evaluation_id }
      });
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/evaluations", async (req, res) => {
    try {
      const { official } = req.query;
      const OficialVote = official ? true : false;
      const result = await Evaluations.findAll({
        where: { OficialVote },
        include: [
          { model: Votes, include: [{ model: Answers }, { model: Questions }] }
        ]
      });
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/evaluations", async (req, res) => {
    try {
      const user_id = req.user.id;
      const { enterprise_id, votes, inProgress } = req.body;

      const eval = await Evaluations.findOne({
        where: { user_id, enterprise_id, OficialVote: false }
      });

      Evaluations.destroy({
        where: { user_id, enterprise_id, OficialVote: false }
      });
      const evaluation = await Evaluations.create({
        user_id,
        enterprise_id,
        impact: votes.impact,
        model: votes.model,
        prioritization: votes.prioritization,
        impactComment: votes.impactComment,
        modelComment: votes.modelComment,
        prioritizationComment: votes.prioritizationComment,
        comment: votes.comment,
        OficialVote: false,
        inProgress
      });

      const result = await Evaluations.findOne({
        where: { id: evaluation.id }
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.delete(
    "/api/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        await Evaluations.destroy({ where: { id } });
        res.status(200).send({ data: true });
      } catch (e) {
        console.log(e);
      }
    }
  );

  /*
  * Kiva Evaluations
  */

  app.get(
    "/api/kiva/evaluations",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const result = await Evaluations.findAll({
          where: { OficialVote: true },
          include: [{ model: Votes }]
        });

        return res
          .status(200)
          .set("x-Total-Count", result.length)
          .send(result);
      } catch (e) {
        console.log(e);
      }
    }
  );

  // kiva use
  app.get("/api/evaluations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Evaluations.findOne({
        where: { id },
        include: [{ model: Votes }]
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/kiva/evaluations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Evaluations.findOne({
        where: { id },
        include: [{ model: Votes }]
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post(
    "/api/kiva/evaluations",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { enterprise_id, status, model, impact, prioritization } = req.body;
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
          prioritization
        });
        console.log(evaluation)
        return res.status(200).send(evaluation);
      } catch (e) {
        console.log(e);
      }
    }
  );

  app.put(
    "/api/kiva/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { enterprise_id, status,
        model, impact, prioritization, comment } = req.body;
        const { id } = req.params;
        const user_id = req.user.id;

        const result =  await Evaluations.update({ enterprise_id, status,
          model, impact, prioritization, comment}, { where: { id } });

        return res.status(200).send(result);
      } catch (e) {
        console.log(e);
      }
    }
  );

  app.put(
    "/api/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { enterprise_id, status,
        model, impact, prioritization, comment } = req.body;
        const { id } = req.params;
        const result =  await Evaluations.update({ enterprise_id, status,
          model, impact, prioritization}, { where: { id } });

        return res.status(200).send(result);
      } catch (e) {
        console.log(e);
      }
    }
  );

  app.delete(
    "/api/kiva/evaluations/:id",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { id } = req.params;
        await Evaluations.destroy({ where: { id } });
        res.status(200).send({ data: true });
      } catch (e) {
        console.log(e);
      }
    }
  );
};
