const express = require("express");
const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./public/Model/user");
// const Expert = require("./public/Model/expert");
const Appointment = require("./public/Model/appointment");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fnsdfk;snfo;as nfnfefj f fojosijf @";
const path = require("path");
const { response } = require("express");

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
  const experts = await User.find({ Role: "Expert" });
  res.render("experts.ejs", { experts });
});

app.get("/doctor-single/:id", async function (req, res) {
  console.log("req.params.id 1");
  const expert = await User.findById(req.params.id);
  res.render("doctor-single.ejs", { expert });
});
app.post("/doctor-single/:id", async function (req, res) {
  console.log("req.params.id 2", req.params.id);

  const expert = await User.findById(req.params.id);
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

// APIs

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
    return res.json({ status: "ok", user, data: token }).send();
  }
  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/loginExpert", async (req, res) => {
  const { Email, Password } = req.body;
  const expert = await User.findOne({ Email, Password }).lean();

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
    console.log("login expert", expert);
    return res.json({ status: "ok", user: expert, data: token }).send();
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
  return res.json({ status: "ok", user: response });
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
    const response = await User.create({
      FirstName,
      LastName,
      Email,
      Password,
      Role: "Expert",
    });
    console.log("Expert created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use" });
    }
    throw error;
  }

  console.log(req.body);
  return res.json({ status: "ok", user: response });
});

app.post("/api/createAppointment", async (req, res) => {
  console.log("in create appointment 1");
  const { Date, Time, Email, FullName, PhoneNumber, Message, Expert_id } =
    req.body;

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

  // if (!Message || typeof Message !== "string") {
  //   return res.json({ status: "error", error: "Invalid Message" });
  // }

  // User.findById(id).exec((err, user) => {
  //   if (err || !user) {
  //     return res.status(400).json({
  //       error: "User not found",
  //     });
  //   }
  //   res.json({ status: "ok", user });
  // });
  console.log("in create appointment 2");

  let Expert = await User.findById(Expert_id).exec();
  console.log("in create appointment 3");
  let Client = await User.findOne({ Email }).exec();
  console.log("Expert in create Appointment", Expert);
  console.log("Client in create Appointment", Client);

  if (!Expert) {
    return res.json({ status: "error", error: "Expert not found " });
  }
  if (!Client) {
    return res.json({ status: "error", error: "Client Not Found" });
  }
  try {
    const response = await Appointment.create({
      Date,
      Time,
      Email,
      FullName,
      PhoneNumber,
      Client: Client,
      Message: Message ? Message : "This is a default message",
      Expert: Expert,
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

app.get("api/user/:id", async (req, res, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    res.json({ status: "ok", user });
  });
});
app.post("/api/updateProfile/:id", async (req, res) => {
  console.log("id recieved in updateProfile", req.params.id, req.body.user);
  User.findById(req.params.id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    let updatedUser = user;

    updatedUser.FirstName = req.body.user.FirstName;
    updatedUser.LastName = req.body.user.LastName;
    updatedUser.Email = req.body.user.Email;
    updatedUser.Password = req.body.user.Password;
    updatedUser.Bio = req.body.user.Bio;

    updatedUser.save((err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      }

      res.json({ status: "ok", user: updatedUser });
    });
    // res.json({ status: "ok", user });
  });
});

app.get("/api/getAllExperts", async (req, res) => {
  User.find({ Role: "Expert" }).exec((err, experts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(experts);
  });
});

app.get("/api/getExpertAppointments/:id", async (req, res) => {
  let Expert = await User.findById(req.params.id).exec();
  if (!Expert) {
    return res.json({ status: "error", error: "Expert Not Found" });
  }
  Appointment.find({ Expert: Expert._id })
    .populate("Expert Client")
    .exec((err, appointments) => {
      if (err) {
        console.log("err", err);
        return res.status(404).json({
          status: err,
          error: "No Appointment found for you!",
        });
      }
      res.json(appointments);
    });
});

app.get("/api/getClientAppointments/:id", async (req, res) => {
  let Client = await User.findById(req.params.id).exec();
  if (!Client) {
    return res.json({ status: "error", error: "Client Not Found" });
  }
  Appointment.find({ Client: Client })
    .populate("Expert Client")
    .exec((err, appointments) => {
      if (err) {
        console.log("err", err);
        return res.status(404).json({
          status: err,
          error: "No Appointment found for you!",
        });
      }
      res.json(appointments);
    });
});

app.post("/api/updateAppointment/:id", async (req, res) => {
  console.log("id recieved in updateAppointment", req.body);
  Appointment.findById(req.params.id).exec((err, appointment) => {
    if (err || !appointment) {
      return res.status(400).json({
        error: "Appointment not found",
      });
    }
    let updatedAppointment = appointment;

    updatedAppointment.Status = req.body.Status;

    updatedAppointment.save((err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      }

      res.json({ status: "ok", updatedAppointment });
    });
    // res.json({ status: "ok", user });
  });
});

app.post("/api/deleteAppointment/:id", async (req, res) => {
  console.log("id recieved in updateAppointment", req.body);
  Appointment.findById(req.params.id).exec((err, appointment) => {
    if (err || !appointment) {
      return res.status(400).json({
        error: "Appointment not found",
      });
    }

    appointment.remove((err) => {
      if (err) {
        return res.status(400).json({
          status: err,
          error: "error occured",
        });
      }
      res.json({ status: "ok" });
    });
  });
});

app.listen(PORT, function () {
  console.log("Server is running");
});
