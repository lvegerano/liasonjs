const Schema = require('../lib/schema').schema;
const schemaConstructor = require('../lib/schemaConstructor');

const dbOptions = {
  client: 'pg',
  debug: true,
  connection: {
    port     : 5433,
    host     : '192.168.99.100',
    user     : 'user',
    password : 'password',
    database : 'default'
  }
};


/*.catch((err) => {
  console.error(err);
});*/


const schema = new Schema(dbOptions);
//
const User = schema.define('User', {
  id: 'increments',
  name: 'string',
  age: 'integer'
});

const newUser = new User();

newUser.update({ age: 55 }, null, 1)/*.then((record) => {
  console.log(record);
})*/;

// newUser.find({
//   where: ['age', '>', 30]
// }, {
//   offset: 1,
//   orderBy: {
//     column: 'age',
//     direction: 'desc',
//   },
//  limit: 1,
// }, ['name', 'age']).then((records) => {
//   console.log(records);
// });


// newUser.create([
//   {
//     name: 'Luis Vegerano',
//     age: 36,
//   }, {
//     name: 'Jon Anderson',
//     age: 65,
//   }, {
//     name: 'Alyssa Vegerano',
//     age: 30,
//   }
// ]).then((records) => {
//   console.log(records);
// }).catch((err) => {
//   console.log(err && err.stack || err);
// });

// newUser.findById(1).then((record) => {
//   console.log(record);
// });


// newUser.findOne({
//   where: ['name', 'ilike', 'Luis%'],
//   andWhere: ['age', '>', 30]
// }).then((record) => {
//   console.log('record', record);
// });

// const Comment = schema.define('Comments', {
//   id: 'increments',
//   comment: 'text'
// });

// const user = new User();
// const comment = new Comment();

// user.create({ name: 'Luis', age: 30 })

// console.log(comment);
// console.log(user);
// process.exit();
