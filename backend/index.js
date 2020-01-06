import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import graphqlHttp from "express-graphql";
import passport from "passport";
import chalk from "chalk";

import logger from "./middlewares/awesomeLogger.js";
import sequelize from "./sequelize/index.js";
import graphQlSchemas from "./graphql/schemas/index.js";
import graphQlResolvers from "./graphql/resolvers/index.js";
import "./sequelize/associations.js";
import "./passport.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Console Logging
const error = chalk.bold.red;
const success = chalk.bold.green;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// GraphQL
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchemas,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

app.use(passport.initialize());

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
  try {
    const main = await Promise.all([sequelize.sync(), sequelize.authenticate()]);

    return main;
  } catch (err) {
    throw new Error(err);
  }
}

if (process.env.NODE_ENV !== "test") {
  main()
    .then(() => {
      app.listen(PORT);
      console.log(success("Connection successful.", `Listening to ${PORT}.`));
    })
    .catch(err => console.error(error("Unable to reach database: "), err));
}
