const Promise = require('bluebird');
const queryBuilder = require('./queryConstructor');

function Model(data) {
  this.definition = data;
  this.tableName = this.constructor.tableName;
  this.knex = this.constructor.knex;
  this.dbClient = this.knex.client.config.client;
}


Model.prototype.create = function _create(data) {
  // fixme: validate data
  const query = queryBuilder(this.knex, this.tableName);

  if (this.dbClient === 'pg') {
    return query.insert(data).return('*');
  }

  return query.insert(data);
};

Model.prototype.findById = function _findById(ids, columns = '*') {
  const where = {
    whereIn: ['id', ids],
  };
  const query = queryBuilder(this.knex, this.tableName, where);
  return query.select(columns);
};

Model.prototype.findOne = function _findOne(where, columns = '*') {
  const query = queryBuilder(this.knex, this.tableName, where);
  query.select(columns).limit(1);
  return query;
};

Model.prototype.find = function _find(where, options, columns = '*') {
  return queryBuilder(this.knex, where, options, columns)
};

Model.prototype.update = function _update(data, where = null, limit = null) {
  // fixme: validateß
  const options = { limit };
  const query = queryBuilder(this.knex, this.tableName, where, options);

  if (Array.isArray(data) && (data.length !== 2 || data.length > 2)) {
    throw new Error('length must be two');
  }

  if (Array.isArray(data)) {
    query.update(...data, '*');
  } else {
    query.update(data, '*');
  }

  return query;
};

Model.prototype.delete = function _delete(where) {
  let query = this.knex(this.tableName);

  if (where) {
    query = whereBuilder(query, where);
  }

  return query;
};

module.exports = Model;
