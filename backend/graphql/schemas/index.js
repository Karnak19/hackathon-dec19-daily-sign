const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    uuid: String!
    email: String!
    firstName: String
    lastName: String
    avatar: String
    Signs: [Sign]
  }
  type Sign {
    uuid: String!
    User: User
    signature: String
    date: Int
    morningOrAfternoon: String
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
    signsUsersWeekly(start: Int!, end: Int!): [User]
  }
  type RootMutation {
    createUser(input: UserInput): User
    createSign(userId: String!, signature: String!): Sign
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
