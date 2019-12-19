const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    uuid: String!
    email: String!
    firstName: String
    lastName: String
    avatar: String
  }

  type RootQuery {
    users: [User!]!
  }

  schema {
    query: RootQuery
  }
`);
