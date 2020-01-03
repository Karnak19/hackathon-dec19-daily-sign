const queries = require("./users.query");
const mutations = require("./users.mutation");

module.exports = {
  ...queries,
  ...mutations
};
