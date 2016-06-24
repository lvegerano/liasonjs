const Promise = require('bluebird');

function Model() {
  const ctor = this.constructor;
}

Model.prototype.create = function _create() {};

Model.prototype.findById = function _findById() {};

Model.prototype.findOne = function _findOne() {};

Model.prototype.find = function _find() {};

Model.prototype.update = function _update() {};

Model.prototype.upsert = function _upsert() {
  
};

Model.prototype.delete = function _delete() {};

module.exports = Model;
