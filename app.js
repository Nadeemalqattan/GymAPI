const express = require("express");
const cors = require("cors");
const passport = require("passport");
const db = require("./db/models");
const path = require("path");
const { localStrategy, jwtStrategy } = require("./middleware/passport");


//Routes
const userRoutes = require("./routes/users");
const gymRoutes = require("./routes/gyms");
const classRoutes = require("./routes/classes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));

// PASSPORT
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(userRoutes);
app.use("/gyms", gymRoutes);
// app.use("/classes", classRoutes);

//Not Found Middleware
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Sorry, we can't find what you're looking for.",
  });
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "Internal Server Error" });
});

// db.sequelize.sync();
db.sequelize.sync({alter: true});
// db.sequelize.sync({force: true});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
