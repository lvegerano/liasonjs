const Promise = require('bluebird');

function Model(data) {
  this.definition = data;
  this.tableName = this.constructor.tableName;
  this.knex = this.constructor.knex;
}

function whereBuilder(queryBuilder, whereObj) {
  // fixme: validate where commands
  const commands = Object.keys(whereObj);
  commands.forEach((command) => {
    queryBuilder[command](...whereObj[command]);
  });
  return queryBuilder;
}

Model.prototype.create = function _create(data) {
  // fixme: validate data
  if (this.knex.client.config.client === 'pg') {
    return this.knex(this.tableName).returning('*').insert(data);
  }
  return this.knex(this.tableName).insert(data);
};

Model.prototype.findById = function _findById(ids) {
  return this.knex(this.tableName).whereIn('id', ids);
};

Model.prototype.findOne = function _findOne(where, columns = '*') {
  const query = whereBuilder(this.knex(this.tableName), where);
  query.select(columns);
  return query.then((records) => {
    return [records.shift()];
  });

};

Model.prototype.find = function _find() {
};

Model.prototype.update = function _update() {
};

Model.prototype.upsert = function _upsert() {

};

Model.prototype.delete = function _delete() {
};

module.exports = Model;
