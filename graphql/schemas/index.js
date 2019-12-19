const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    uuid: String!
    email: String!
    firstName: String
    lastName: String
    avatar: String
  }
  type Sign {
    uuid: String!
    user: User
  }

  type RootQuery {
    users: [User!]!
    user(id: String!): User
    signs: [Sign!]!
  }

  input UserInput {
    email: String!
    firstName: String
    lastName: String
    avatar: String
  }

  type RootMutation {
    createUser(input: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
