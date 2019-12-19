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
    user(id: String!): User
  }

  type RootMutation {
    createUser(email: String!): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
