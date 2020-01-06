import queries from "./users.query.js";
import mutations from "./users.mutation.js";

export default {
  ...queries,
  ...mutations
};
