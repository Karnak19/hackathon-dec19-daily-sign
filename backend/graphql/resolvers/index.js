import userResolver from "./users/index.js";
import signResolver from "./signs/index.js";

const rootResolver = {
  ...userResolver,
  ...signResolver
};

export default rootResolver;
