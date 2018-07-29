const passport = require("passport");
const _ = require("lodash");

module.exports = app => {
  const { Evaluations, Votes, Answers, Questions } = app.datasource.models.Enterprises.model;

    app.get("/api/votes",  async (req, res) => {
      try {
        const {evaluation_id} = req.query;
        const result = await Votes.findAll({
          where: { evaluation_id  }
        });
        return res
          .status(200)
          .set("x-Total-Count", result.length)
          .send(result);
      } catch(e) {
          console.log(e)
      }
    })

  app.get(
    "/api/evaluations",
    async (req, res) => {
      try {
        const { official } = req.query;
        const OficialVote = official ? true : false;
        const result = await Evaluations.findAll({
          where: { OficialVote }, include: [{ model: Votes, include: [{model: Answers}, {model: Questions}]}]
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

  app.post("/api/evaluations", async (req, res) => {
        try {
          const idUser = req.user.id;
          const { enterprise_id, votes, inProgress } = req.body;

          const eval = await Evaluations.findOne({
             where:{idUser, enterprise_id, OficialVote: false}
           })
          eval ? await Votes.destroy({where: {evaluation_id: eval.id}}) : null

          Evaluations.destroy({where: {idUser, enterprise_id, OficialVote: false}})
          const evaluation = await Evaluations.create(
            {
              idUser,
              enterprise_id,
              OficialVote: false,
              inProgress
            }
          );

          const promises = _.map(votes.votes, (value, questionid) => {
            if (value) {
              return Votes.create(
                {
                  evaluation_id: evaluation.id,
                  question_id: questionid,
                  answer_id: value.answer,
                  comment: value.comment
                }
              );
            }
          });

           await Promise.all(promises);
           const result = await Evaluations.findOne({
              where: { id: evaluation.id},
              include: [{ model: Votes }]
            });

           return res.status(200).send(result);
        } catch (e) {
          console.log(e);
        }
      });

  app.delete("/api/evaluations/:id", passport.authenticate("jwt"), async (req, res) => {
      try {
          const { id } = req.params;
          await Evaluations.destroy({where: {id}})
          res.status(200).send({data: true});
      } catch (e) {
        console.log(e)
      }
  });

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

  app.get(
    "/api/kiva/evaluations/:id",
    async (req, res) => {
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
    }
  );

  app.post(
    "/api/kiva/evaluations",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { enterprise_id, status } = req.body;
        const idUser = req.user.id;
        const votes = _.omit(req.body, ["enterprise_id", "status"]);

        const eval = await Evaluations.findOne({
           where:{idUser, enterprise_id, OficialVote: true}
         })
         eval ? await Votes.destroy({where: {evaluation_id: eval.id}}) : null

        Evaluations.destroy({where: {idUser, enterprise_id, OficialVote: true}})
        const evaluation = await Evaluations.create(
          {
            idUser,
            enterprise_id,
            OficialVote: true,
            status
          }
        );

        const promises = _.map(votes, (v, k) => {
          return Votes.create(
            {
              evaluation_id: evaluation.id,
              question_id: k.replace("question-", ""),
              answer_id: v
            },
            { returning: true }
          );
        });

        await Promise.all(promises);
        const result = await Evaluations.findOne({
           where: { id: evaluation.id},
           include: [{ model: Votes }]
         });

        return res.status(200).send(result);
      } catch (e) {
        console.log(e);
      }
    }
  );


  app.put("/api/kiva/evaluations/:id", passport.authenticate("jwt"), async (req, res) => {
      try {
        const { enterprise_id, status } = req.body;
        const { id } = req.params;
        const idUser = req.user.id;
        const votes = _.omit(req.body, ["idUser", "enterprise_id", "Votes",
        "updated_at", "created_at", "OficialVote", "inProgress", "id", "status"]);

        await Evaluations.update(
          { enterprise_id, status },
          { where: { id } }
        );

        const promises = _.map(votes, (v, k) => {
          return Votes.update(
            {
              answer_id: v
            },
            { where: {evaluation_id: id, question_id: k.replace("question-", "")}}
          );
        });

        await Promise.all(promises);
        const result = await Evaluations.findOne({
           where: { id },
           include: [{ model: Votes }]
         });

        return res.status(200).send(result);
      } catch (e) {
        console.log(e);
      }
    }
  );

  app.delete("/api/kiva/evaluations/:id", passport.authenticate("jwt"), async (req, res) => {
      try {
          const { id } = req.params;
          await Evaluations.destroy({where: {id}})
          res.status(200).send({data:true});
      } catch (e) {
        console.log(e)
      }
  });


};
