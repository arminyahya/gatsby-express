var express = require('express');
var express_graphql = require('express-graphql');
var { schema, root} = require('./schema');
var isAuth = require('./middleware/is-auth');
var app = express();

app.use(isAuth)
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));