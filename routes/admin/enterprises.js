const passport = require("passport");
const jotFormAPI = require("../../services/jotForm");
const uuid = require("uuid/v1");
const AWS = require("aws-sdk");
const keys = require("../../config/keys");
const Busboy = require("busboy");
const BUCKET_NAME = "data-store-blog";
const _ = require("lodash");

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
  const {
    Enterprises,
    Evaluations,
    Sectors,
    Comments,
    Images,
    CommentVotes
  } = app.datasource.models.Enterprises.model;

  app.get(
    "/api/admin/applications",
    passport.authenticate("jwt"),
    async (req, res) => {
      try {
        const { _start, _end } = req.query;
        const form = await jotFormAPI.getForm();
        const result = await jotFormAPI.getEnterprises(_start, _end);
        return res
          .status(200)
          .set("x-Total-Count", form.data.content.count)
          .send(result.data.content);
      } catch (e) {
        console.log(e);
      }
    }
  );

    app.delete("/api/admin/enterprises/:id", passport.authenticate("jwt"), async (req, res) => {
      try {
        const { id } = req.params;
        await Enterprises.destroy({ where: { id } });
        res.status(200).send({ data: true });
      } catch (e) {
        console.log(e);
      }
    });

  function uploadToS3(file, id) {
    return new Promise((resolve, reject) => {
      const buff = new Buffer(
        file.src.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      s3.createBucket(function() {
        var params = {
          Bucket: BUCKET_NAME,
          Key: `${id}/${uuid()}.jpeg`,
          Body: buff,
          ContentEncoding: "base64",
          ContentType: "image/jpeg"
        };

        s3.upload(params, function(err, data) {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
    });
  }

  app.post(
    "/api/admin/enterprises",

    async (req, res) => {
      try {
        const { ids } = req.body;
        const promises = ids.map(async EnterpriseId => {
          const response = await jotFormAPI.getEnterprise(EnterpriseId);
          const id = response.data.content.id;
          const name = getAnswer(response, 185);
          const email = getAnswer(response, 236);
          const image1 = getAnswer(response, 239)[0];
          const description = getAnswer(response, 213);
          const business = getAnswer(response, 214);
          const paidEmployees = getAnswer(response, 132);
          const ownershipStatus = getAnswer(response, 196);
          const certificateIncorporation = getAnswer(response, 42)[0];
          const businessPlan = getAnswer(response, 44)[0];
          const impactStudy = getAnswer(response, 143)[0];
          const managementTeam = getAnswer(response, 43)[0];
          const boardOfDirectors = getAnswer(response, 249)[0];
          const anualReport = getAnswer(response, 51)[0];
          const historicalFinancial = getAnswer(response, 182)[0];
          const YDTFinancial = getAnswer(response, 194)[0];

          const newEnterprise = Enterprises.upsert(
            {
              id,
              name,
              email,
              image1,
              description,
              business,
              ownershipStatus,
              paidEmployees,
              certificateIncorporation,
              impactStudy,
              managementTeam,
              boardOfDirectors,
              anualReport,
              historicalFinancial,
              YDTFinancial
            },
            { returning: true }
          );
          return newEnterprise;
        });

        await Promise.all(promises);
        res.status(200).send();
      } catch (e) {
        console.log(e);
        res.status(402).send({ message: "Can not process identity" });
      }
    }
  );

  app.put("/api/admin/enterprises/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const {
        id,
        name,
        email,
        published,
        sector,
        endDate,
        image1,
        loan,
        loanPurpose,
        business,
        paidEmployees,
        ownershipStatus,
        beganOperating,
        asset,
        salesRevenue,
        sector_id,
        pictures,
        country_id,
        shortDescription
      } = req.body;

      if (_.isEmpty(req.body.Images)) {
        await Images.destroy({ where: { enterprise_id: id } });
      } else {
        const totalImages = await Images.findAll({
          where: { enterprise_id: id }
        });
        const current = _.map(req.body.Images, img => img.url)
        const toDelete = totalImages.filter(x => !current.includes(x.url));
        const promises = _.map(toDelete, img => {
          return Images.destroy({ where: { id: img.id } });
        });
        await Promise.all(promises);
      }

      if (pictures) {
        const promises = pictures.map(picture => {
          return uploadToS3(picture, id);
        });
        const pics = await Promise.all(promises);

        const picsPromises = pics.map(picture => {
          return Images.create({ url: picture.Location, enterprise_id: id });
        });

        await Promise.all(picsPromises);
      }
      const result = await Enterprises.update(
        {
          id,
          name,
          email,
          published,
          sector,
          endDate,
          image1,
          loan,
          loanPurpose,
          business,
          paidEmployees,
          ownershipStatus,
          beganOperating,
          asset,
          salesRevenue,
          sector_id,
          country_id,
          shortDescription
        },
        { where: { id } }
      );

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/admin/enterprises", async (req, res) => {
    try {
      result = await Enterprises.findAll({
        include: [
          { model: Evaluations, as: "Evaluations" },
          { model: Sectors },
          { model: Images },
          { model: Comments, attributes: ["id"] }
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

  app.get("/api/admin/enterprises/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Enterprises.findOne({
        where: { id },
        include: [{ model: Sectors }, { model: Images }, { model: Comments, attributes: ["id"] }]
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  const getAnswer = (response, id) => {
    return response.data.content.answers[id].answer;
  };
};
