var Db = function(config) {
  this.init(config);
};

Db.prototype = {
  init: function(config) {
    this.knew = require('knex')(config.database);
    this.bookshelf = require("bookshelf")(this.knex);
    this.models = {};
    this.loadModels(["User"])
  },

  loadModels: function(models) {
    for(var i in models) {
      this.models[models[i]] = require("./models/" + models[i] + "Model.js")(this.models, this.bookshelf);
    }
  }
};

module.exports = function(config) {
  return new Db(config);
};
