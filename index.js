const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./userModel/User");

const PORT = process.env.PORT || 5500;
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the DB"))
  .catch((error) => console.log(error));

app.post("/", async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    fullName: `${req.body.lastName} ${req.body.firstName}`,
    age: req.body.age,
    gender: req.body.gender,
    state: req.body.state,
    parentEmail: req.body.parentEmail,
  });
  try {
    const newFullName = User.findOne({
      fullName: `${req.body.lastName} ${req.body.firstName}`,
    });
    const newEmail = User.findOne({ parentEmail: req.body.parentEmail });

    if (newFullName === `${req.body.lastName} ${req.body.firstName}`) {
      res.status(403).send("User exists");
    }
    if (newEmail === req.body.parentEmail) {
      res.status(403).json("Email exists");
    }
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log("Backend server connected!");
});
