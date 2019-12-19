const userResolver = require("./users");

const rootResolver = {
  ...userResolver
};

module.exports = rootResolver;
