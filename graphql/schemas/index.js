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
    User: User
  }

  input UserInput {
    email: String!
    firstName: String
    lastName: String
    avatar: String
  }

  type RootQuery {
    users: [User!]!
    user(id: String!): User
    signs: [Sign!]!
    sign(id: String!): Sign
  }
  type RootMutation {
    createUser(input: UserInput): User
    createSign(userId: String!): Sign
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
