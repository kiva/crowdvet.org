const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const keys = require('./keys');
let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  let model;
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};

const getDatabase = () => {
  if(keys.databaseURL) {
    return new Sequelize(keys.databaseURL, {define: { underscored: true } });
  } else {
    return new Sequelize(keys.database, keys.username,
      keys.password, keys.params);
  }
}

module.exports = (app) => {
  if (!database) {
    //const config = app.config;
    const sequelize = getDatabase();


    database = {
      sequelize,
      Sequelize,
      models: {},
    };

    database.models = loadModels(sequelize);
    sequelize.sync();

  }
  return database;
};
