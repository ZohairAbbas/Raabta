const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./public/Model/user");
const Expert = require("./public/Model/expert");
const Appointment = require("./public/Model/appointment");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fnsdfk;snfo;as nfnfefj f fojosijf @";
const path = require("path");

const uri =
  "mongodb+srv://hr:hr@db-project.44kc3.mongodb.net/Raabta?retryWrites=true&w=majority";
app.use(express.static(path.join(__dirname, "public")));

try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}

app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.get("/about", function (req, res) {
  res.render("about.ejs");
});
app.get("/blog-whatIsMentalHealth", function (req, res) {
  // I added
  res.render("blog-whatIsMentalHealth.ejs");
});
app.get("/blog-youngPeople", function (req, res) {
  // I added
  res.render("blog-youngPeople.ejs");
});
app.get("/blog-mentalHealthAwareness", function (req, res) {
  // I added
  res.render("blog-mentalHealthAwareness.ejs");
});
app.get("/blog-worldChange", function (req, res) {
  // I added
  res.render("blog-whatIsMentalHealth.ejs");
});
app.get("/blog-mentalHealthEducation", function (req, res) {
  // I added
  res.render("blog-youngPeople.ejs");
});
app.get("/blog-anxiety", function (req, res) {
  // I added
  res.render("blog-mentalHealthAwareness.ejs");
});
app.get("/blogs", function (req, res) {
  res.render("blogs.ejs");
});
app.get("/createblog", function (req, res) {
  res.render("createblog.ejs");
});
app.get("/experts", async function (req, res) {
  const experts = await Expert.find({});
  res.render("experts.ejs", { experts });
});

app.get("/doctor-single/:id", async function (req, res) {
  const expert = await Expert.findById(req.params.id);
  res.render("doctor-single.ejs", { expert });
});
app.get("/login", function (req, res) {
  res.render("login.ejs");
});
app.get("/signupUser", function (req, res) {
  res.render("signupUser.ejs");
});
app.get("/signupExpert", function (req, res) {
  res.render("signupExpert.ejs");
});
app.get("/loginUser", function (req, res) {
  res.render("loginUser.ejs");
});
app.get("/loginExpert", function (req, res) {
  res.render("loginExpert.ejs");
});
app.get("/user-dashboard", function (req, res) {
  res.render("user-dashboard.ejs");
});
app.get("/expert-dashboard", function (req, res) {
  res.render("expert-dashboard.ejs");
});
app.get("/pages-profile", function (req, res) {
  res.render("pages-profile.ejs");
});

app.use(express.static(__dirname + "/public/"));

app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email, Password }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  } else {
    const token = jwt.sign(
      {
        id: user._id,
        Email: user.Email,
      },
      JWT_SECRET
    );
    req.user = user;
    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/loginExpert", async (req, res) => {
  const { Email, Password } = req.body;
  const expert = await Expert.findOne({ Email, Password }).lean();

  if (!expert) {
    return res.json({ status: "error", error: "Invalid username/password" });
  } else {
    const token = jwt.sign(
      {
        id: expert._id,
        Email: expert.Email,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/register", async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  if (!FirstName || typeof FirstName !== "string") {
    return res.json({ status: "error", error: "Invalid first name" });
  }

  if (!LastName || typeof LastName !== "string") {
    return res.json({ status: "error", error: "Invalid last name" });
  }

  if (!Email || typeof Email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (!Password || typeof Password !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (Password.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 5 characters",
    });
  }

  try {
    const response = await User.create({
      FirstName,
      LastName,
      Email,
      Password,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use" });
    }
    throw error;
  }

  console.log(req.body);
  res.json({ status: "ok" });
});

app.post("/api/registerExpert", async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  if (!FirstName || typeof FirstName !== "string") {
    return res.json({ status: "error", error: "Invalid first name" });
  }

  if (!LastName || typeof LastName !== "string") {
    return res.json({ status: "error", error: "Invalid last name" });
  }

  if (!Email || typeof Email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (!Password || typeof Password !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (Password.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 5 characters",
    });
  }

  try {
    const response = await Expert.create({
      FirstName,
      LastName,
      Email,
      Password,
    });
    console.log("Expert created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use" });
    }
    throw error;
  }

  console.log(req.body);
  res.json({ status: "ok" });
});

app.post("/api/createAppointment", async (req, res) => {
  const { Date, Time, Email, FullName, PhoneNumber, Message } = req.body;

  if (typeof Date !== "string") {
    return res.json({ status: "error", error: "Invalid Date" });
  }

  if (!Time || typeof Time !== "string") {
    return res.json({ status: "error", error: "Invalid Time" });
  }

  if (!Email || typeof Email !== "string") {
    return res.json({ status: "error", error: "Invalid Email" });
  }

  if (!FullName || typeof FullName !== "string") {
    return res.json({ status: "error", error: "Invalid Full Name" });
  }

  if (!PhoneNumber || typeof PhoneNumber !== "string") {
    return res.json({ status: "error", error: "Invalid Phone Number" });
  }

  if (!Message || typeof Message !== "string") {
    return res.json({ status: "error", error: "Invalid Message" });
  }

  try {
    const response = await Appointment.create({
      Date,
      Time,
      Email,
      FullName,
      PhoneNumber,
      Message,
    });
    console.log("Appointment created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        error: "Appointment already in made",
      });
    }
    throw error;
  }

  console.log(req.body);
  res.json({ status: "ok" });
});

app.listen(PORT, function () {
  console.log("Server is running");
});
