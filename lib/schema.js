const Promise = require('bluebird');
const Pluralize = require('pluralize');

const util = require('util');
const helpers = require('./helpers');
const BaseModel = require('./baseModel');
const schemaConstructor = require('./schemaConstructor');

/**
 * 
 * 
 * @param {Object} dbOptions
 */
function Schema(dbOptions) {
  if (typeof dbOptions !== 'object') {
    throw new TypeError('dbOptions must be a knex connection object!');
  }

  this.knex = require('./connection')(dbOptions);
  this.models = {};
}

/**
 * 
 * 
 * @param {String} name - Model name
 * @param {Object} definition
 * @returns {Object} BaseModel
 */
Schema.prototype.define = function _schemaDefine(name, definition) {
  const schema = this;

  if (typeof name !== 'string') {
    throw new TypeError('name must be a string!');
  }

  if (definition !== null && typeof definition !== 'object') {
    throw new TypeError('definition must be an object!');
  }

  let tableName = 'default';

  if (!this.models.hasOwnProperty(name)) {
    tableName = Pluralize(name).toLowerCase();
  }

  schemaConstructor.createTable(tableName, definition, this.knex)
    .asCallback((err) => {
      if (err) {
        throw new Error(err);
      }
    });

  const Model = function _baseModelConstructor(data) {
    BaseModel.call(this, data);
  };

  util.inherits(Model, BaseModel);

  helpers.hiddenProp(Model, 'schema', schema);
  helpers.hiddenProp(Model, 'modelName', name);
  helpers.hiddenProp(Model, 'tableName', tableName);
  helpers.hiddenProp(Model, 'relations', {});
  helpers.hiddenProp(Model, 'knex', this.knex);

  this.models[name] = Model;
  return Model;
};

exports.schema = Schema;
