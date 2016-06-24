const _ = require('lodash');
const Pluralize = require('pluralize');

function getColumnWithPrecision(table, method, columnName, columnDef) {
  let column;

  if (columnDef.hasOwnProperty('precision') && columnDef.hasOwnProperty('scale')) {
    column = table[method](columnName, columnDef.precision, columnDef.scale);
  } else if (columnDef.hasOwnProperty('precision')) {
    column = table[method](columnName, 8, columnDef.scale);
  } else if (columnDef.hasOwnProperty('scale')) {
    column = table[method](columnName, columnDef.precision, 2);
  } else {
    column = table[method](columnName);
  }

  return column;
}

exports.createTable = function(name, tableDefinition, dbOptions) {
  const knex = require('./connection')(dbOptions);
  const tableName = Pluralize(name);
  const columns = Object.keys(tableDefinition);
  const schema = tableDefinition;

  return knex.schema.createTableIfNotExists(tableName, (table) => {
    let column;

    columns.forEach((columnName) => {
      const columnDef = schema[columnName];
      const method = schema[columnName].type;

      if (method === 'text' && columnDef.hasOwnProperty('textType')) {
        column = table[method](columnName, columnDef.textType);
      } else if ((method === 'string' || method === 'binary') && columnDef.hasOwnProperty('maxLength')) {
        column = table[method](columnName, columnDef.maxLength);
      } else if (method === 'enu' && columnDef.hasOwnProperty('fields')) {
        if (!Array.isArray(columnDef.fields)) {
          throw new TypeError('Fields value must be an array');
        }
        column = table[method](columnName, columnDef.fields);
      } else if ((method === 'float' || method === 'decimal') && Object.keys(columnDef).length > 1) {
        column = getColumnWithPrecision(table, method, columnName, columnDef);
      } else {
        column = table[method](columnName);
      }

      if (columnDef.hasOwnProperty('index') && columnDef.index === true) {
        column.index();
      }

      if (columnDef.hasOwnProperty('primary') && columnDef.primary === true) {
        column.primary();
      }

      if (columnDef.hasOwnProperty('unique') && columnDef.unique === true) {
        column.unique();
      }

      if (columnDef.hasOwnProperty('references') && _.isString(columnDef.references) && !_.isEmpty(columnDef.references)) {
        column.references(columnDef.references);
      }

      if (columnDef.hasOwnProperty('defaultTo') && !_.isEmpty(columnDef.defaultTo)) {
        column.defaultTo(columnDef.defaultTo);
      }

      if (columnDef.hasOwnProperty('unsigned') && columnDef.unsigned === true) {
        column.unsigned();
      }

      if (columnDef.hasOwnProperty('nullable') && columnDef.nullable === true) {
        column.nullable();
      } else {
        column.notNullable();
      }

      if (columnDef.hasOwnProperty('first') && columnDef.first === true) {
        column.first();
      }

      if (columnDef.hasOwnProperty('after') && _.isString(columnDef.after) && !_.isEmpty(columnDef.after)) {
        column.after(columnDef.after);
      }

      if (columnDef.hasOwnProperty('comment') && _.isString(columnDef.comment) && !_.isEmpty(columnDef.comment)) {
        column.comment(columnDef.comment);
      }

      if (columnDef.hasOwnProperty('collate') && _.isString(columnDef.collate) && !_.isEmpty(columnDef.collate)) {
        column.collate(columnDef.collate);
      }
    });
  });
};
