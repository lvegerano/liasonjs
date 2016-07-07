function whereBuilder(queryBuilder, whereObj) {
  const commands = Object.keys(whereObj);
  commands.forEach((command) => {
    queryBuilder[command](...whereObj[command]);
  });
  return queryBuilder;
}

/**
 * 
 * @param {Object} knex - knex.js instance
 * @param {String} tableName
 * @param {Object} where
 * @param {Object} options
 * @returns {QueryCompiler}
 */
function queryBuilder(knex, tableName, where, options) {
  let query = knex(tableName);
  query = whereBuilder(query, where);

  if (options && options.orderBy) {
    if (typeof options.orderBy === 'object' && options.orderBy.hasOwnProperty('direction')) {
      query.orderBy(options.orderBy.column, options.orderBy.direction);
    } else {
      query.orderBy(options.orderBy);
    }
  }

  if (options && options.groupBy) {
    query.groupBy(options.groupBy);
  }

  if (options && options.limit) {
    query.limit(options.limit);
  }

  if (options && options.offset) {
    query.offset(options.offset);
  }

  return query;
}

exports.queryBuilder = queryBuilder;
