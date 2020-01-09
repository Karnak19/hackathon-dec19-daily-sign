require("dotenv").config();
const express = require("express");
const cors = require("cors");
const graphqlHttp = require("express-graphql");

const models = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue,
    graphiql: true
  })
);

models.sequelize.sync().then(() => {
  app.listen(PORT);
});
