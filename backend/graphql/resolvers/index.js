const userResolver = require("./users");
const signResolver = require("./signs");

const rootResolver = {
  ...userResolver,
  ...signResolver
};

module.exports = rootResolver;
