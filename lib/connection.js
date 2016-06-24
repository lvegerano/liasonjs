
let connection;

module.exports = function _dbConnection(options) {
  if (typeof connection === 'undefined') {
    connection = require('knex')(options);
  }
  return connection;
};
