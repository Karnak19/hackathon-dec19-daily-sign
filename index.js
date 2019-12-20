require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const graphqlHttp = require("express-graphql");
const sequelize = require("./sequelize");
require("./sequelize/associations");
const passport = require("passport");
// Console Logging
const chalk = require("chalk");
const error = chalk.bold.red;
const success = chalk.bold.green;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(require("./middlewares/awesomeLogger"));

// GraphQL
const graphQlSchemas = require("./graphql/schemas");
const graphQlResolvers = require("./graphql/resolvers");
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchemas,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

app.use(passport.initialize());
require("./passport");

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const { jwt, id } = req.user;
    res.redirect(`${process.env.FRONT_HOST}/login?token=${jwt}&id=${id}`);
  }
);

async function main() {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log(success("Connection successful."));
    app.listen(PORT, err => {
      if (err) {
        throw new Error(error("Something bad happened ..."));
      }
      console.log(success(`Listening to ${PORT}.`));
    });
  } catch (err) {
    console.error(error("Unable to reach database: "), err);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}
