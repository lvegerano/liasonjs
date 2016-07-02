const Promise = require('bluebird');

function Model(data) {
  this.definition = data;
  this.taleName = this.constructor.tableName;
  this.knex = this.constructor.knex;
}

Model.prototype.create = function _create(data) {
  return new Promise((resolve, reject) => {
    function handleResolve(records) {
      if (records && records.length === 1) {
        return resolve(records.shift());
      }
      return resolve(records);
    }

    // todo: validate data

    if (this.knex.client.config.client === 'pg') {
      return this.knex(this.taleName).returning('*').insert(data)
        .then(handleResolve)
        .catch(reject);
    }
    return this.knex(this.taleName).insert(data).then(handleResolve).catch(reject);
  });
};

Model.prototype.findById = function _findById(ids) {};

Model.prototype.findOne = function _findOne() {};

Model.prototype.find = function _find() {};

Model.prototype.update = function _update() {};

Model.prototype.upsert = function _upsert() {
  
};

Model.prototype.delete = function _delete() {};

module.exports = Model;
