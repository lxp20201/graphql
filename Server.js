const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const env = require("dotenv").config();
var app = express();
const port = process.env.PORT || 9000;

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema-app/schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolver-app/resolvers')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})


app.use(bodyParser.json() , cors())
const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);