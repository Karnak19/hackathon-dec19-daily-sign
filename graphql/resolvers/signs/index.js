const queries = require("./signs.query");
const mutations = require("./signs.mutation");

module.exports = {
  ...queries,
  ...mutations
};
