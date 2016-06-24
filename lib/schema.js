const util = require('util');
const BaseModel = require('./baseModel');

/**
 * Defines a read only property on Object 
 * 
 * @param {Object} from
 * @param {String} where
 * @param {*} value
 */
function hiddenProp(from, where, value) {
  Object.defineProperty(from, where, {
    writable: false,
    configurable: false,
    enumerable: false,
    value
  });
}

/**
 * 
 * 
 * @param {Object} dbOptions
 */
function Schema(dbOptions) {
  const schema = this;

  if (typeof dbOptions !== 'object') {
    throw new TypeError('dbOptions must be a knex connection object!');
  }

  schema.knex = require('./connection')(dbOptions);
  schema.models = {};
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

  const modelName = name.toLowerCase();
  const Model = function _baseModelConstructor(data) {
    BaseModel.call(this, data);
  };

  util.inherits(Model, BaseModel);

  hiddenProp(Model, 'schema', schema);
  hiddenProp(Model, 'modelName', modelName);
  hiddenProp(Model, 'relations', {});

  return Model;
};

exports.schema = Schema;
